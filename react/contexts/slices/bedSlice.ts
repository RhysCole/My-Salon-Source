import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IBedObject, type UserProfile, type ISunbedData } from '@/Models/types'
import { fetchBeds } from '@/contexts/thunks/bedsThunks'

export interface BedState {
    beds: IBedObject[],
    isLoading: boolean,
    error: string | null,
}

const initialState: BedState = {
    beds: [],
    isLoading: true,
    error: null,
}

const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    startSession: (
      state,
      action: PayloadAction<{
        bedId: string;
        user: UserProfile;
        sessionId: string;
        duration: number;
      }>
    ) => {
      const bed = state.beds.find(
        (b) => b.bedInfo?.id === action.payload.bedId
      );
      if (bed) {
        bed.status = "In Use";
        bed.currentUser = action.payload.user;

        const startTime = new Date();
        const endTime = new Date(
          startTime.getTime() + action.payload.duration * 60000
        );

        bed.times = {
          startTime: startTime.toISOString(), // Convert to a string
          endTime: endTime.toISOString(), // Convert to a string
        };
      }
    },
    finishSession: (state, action: PayloadAction<{ bedId: string }>) => {
      const bed = state.beds.find(
        (b) => b.bedInfo?.id === action.payload.bedId
      );

      if (bed) {
        bed.status = "Cleaning";
        bed.currentUser = null;
        bed.times = null;
      }
    },
    markAsCleaned: (state, action: PayloadAction<{ bedId: string }>) => {
      const bed = state.beds.find(
        (b) => b.bedInfo?.id === action.payload.bedId
      );

      if (bed) {
        bed.status = "Available";
      }
    },
    addUser: (
      state,
      action: PayloadAction<{ bedId: string; user: UserProfile }>
    ) => {
      const bed = state.beds.find(
        (b) => b.bedInfo?.id === action.payload.bedId
      );

      if (bed) {
        bed.currentUser = action.payload.user;
        bed.status = "Ready";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeds.pending, (state) => {
        // When the fetch starts, set loading to true.
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBeds.fulfilled,
        (state, action: PayloadAction<ISunbedData[]>) => {
          state.beds = action.payload.map((sunbedInfo) => ({
            bedInfo: sunbedInfo,
            status: sunbedInfo.oporational ? "Available" : "Maintenance",
            times: null,
            currentUser: null,
          }));
          state.isLoading = false;
        }
      )
      .addCase(fetchBeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch beds.";
      });
  },
});

export const {startSession, finishSession, markAsCleaned, addUser} = bedSlice.actions;
export default bedSlice.reducer;