import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ICustomer, type IQueueItem, type IBooking } from "@/Models/types";
import { nanoid } from "@reduxjs/toolkit";

import {
  fetchBookings,
  addBooking,
  updateBookingStatus,
  removeBooking,
} from "../thunks/queueThunk";

interface QueueState {
  queue: IQueueItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: QueueState = {
  queue: [],
  isLoading: true,
  error: null,
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addWalkIn: (state, action: PayloadAction<{ customer: ICustomer }>) => {
      state.queue.push({
        item: action.payload.customer,
        id: nanoid(), 
      });
    },
    removeFromQueue: (state, action: PayloadAction<{ id: string }>) => {
      state.queue = state.queue.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBookings.fulfilled,
        (state, action: PayloadAction<IBooking[]>) => {
          state.isLoading = false;
          action.payload.map((booking) => {
            state.queue.push({
              item: booking,
              id: booking.id,
            });
          });
        }
      )
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch bookings.";
      })

      .addCase(
        addBooking.fulfilled,
        (state, action: PayloadAction<IBooking>) => {
            state.queue.push({
              item: action.payload,
              id: action.payload.id,
            });
        }
      )

      .addCase(
        updateBookingStatus.fulfilled,
        (state, action: PayloadAction<IBooking>) => {
          const index = state.queue.findIndex(
            (b) => b.id === action.payload.id
          );
          if (index !== -1) {
            state.queue[index] = {
              id: action.payload.id,
              item: action.payload,
            };
          }
        }
      )

      .addCase(
        removeBooking.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.queue = state.queue.filter(
            (b) => b.id !== action.payload
          );
        }
      );
  },
});

export const {addWalkIn, removeFromQueue} = queueSlice.actions;
export default queueSlice.reducer;
