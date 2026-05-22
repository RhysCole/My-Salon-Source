// File: src/react/store/thunks/bookingsThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabaseClient';
import { type RootState } from '../store';
import { type IBooking } from '@/Models/types';

// --- Type Definitions for Thunk Arguments ---

// Defines the flexible options for fetching bookings. All are optional.
export type FetchByDatePayload = {
    startDate: string; // ISO string format, e.g., new Date().toISOString()
    endDate: string;   // ISO string format
    salonId?: string;  // Optional salon ID
};


// Defines the data needed to create a new booking.
type AddBookingPayload = {
    customerId: string;
    bookingTime: string; // ISO string format
    duration: number;
    notes?: string;
};

// Defines the data needed to update a booking's status.
type UpdateBookingStatusPayload = {
    bookingId: string;
    newStatus: 'scheduled' | 'Completed' | 'In Progress';
};


// =====================================================================================
// 1. THUNK TO FETCH BOOKINGS
// =====================================================================================
export const fetchBookings = createAsyncThunk<
    IBooking[],
    FetchByDatePayload,
    { state: RootState }
>(
    'bookings/fetchScheduledByDate',
    async (payload, { getState }) => {
        const state = getState();
        const companyId = state.user.profile?.companyId;

        if (!companyId) {
            throw new Error("User's company ID is not available.");
        }

        const { data, error } = await supabase.rpc('get_bookings', {
            company_id_input: companyId,
            start_date_input: payload.startDate,
            end_date_input: payload.endDate,
            salon_id_input: payload.salonId || null
        });

        if (error) throw error;
        return data as IBooking[];
    }
);


// =====================================================================================
// 2. THUNK TO ADD A BOOKING
// =====================================================================================
export const addBooking = createAsyncThunk<
    IBooking, // Returns the newly created booking object
    AddBookingPayload,
    { state: RootState }
>(
    'bookings/addBooking',
    async (newBookingData, { getState }) => {
        const state = getState();
        const profile = state.user.profile;

        // NOTE: Assumes your UserProfile in Redux also contains the staff `id`.
        const staffId = profile?.staffId; 

        if (!profile?.companyId || !profile?.salonId || !staffId) {
            throw new Error("User profile is not fully available.");
        }

        // Call the 'add_booking' database function.
        const { data, error } = await supabase.rpc('add_booking', {
            customer_id_input: newBookingData.customerId,
            staff_id_input: staffId,
            booking_time_input: newBookingData.bookingTime,
            duration_input: newBookingData.duration,
            notes_input: newBookingData.notes,
            company_id_input: profile.companyId,
            salon_id_input: profile.salonId,
        });

        if (error) throw error;

        return data as IBooking;
    }
);


// =====================================================================================
// 3. THUNK TO UPDATE A BOOKING'S STATUS
// =====================================================================================
export const updateBookingStatus = createAsyncThunk<
    IBooking, // Returns the updated booking object
    UpdateBookingStatusPayload
>(
    'bookings/updateStatus',
    async ({ bookingId, newStatus }) => {
        // Call the 'update_booking_status' database function.
        const { data, error } = await supabase.rpc('update_booking_status', {
            booking_id_input: bookingId,
            new_status: newStatus
        });

        if (error) throw error;

        return data as IBooking;
    }
);


// =====================================================================================
// 4. THUNK TO REMOVE A BOOKING
// =====================================================================================
export const removeBooking = createAsyncThunk<
    string, // Returns the ID of the deleted booking for confirmation
    { bookingId: string }
>(
    'bookings/removeBooking',
    async ({ bookingId }) => {
        // Call the 'remove_booking' database function.
        const { data, error } = await supabase.rpc('remove_booking', {
            booking_id_input: bookingId
        });

        if (error) throw error;

        return data; // This will be the UUID of the deleted booking
    }
);
