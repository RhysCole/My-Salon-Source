import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ICustomer } from "@/Models/types";
import { fetchCustomers } from "../thunks/customersThunk";

interface CustomerState{
    customers: ICustomer[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    customers: [],
    isLoading: false,
    error:null,
}

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<ICustomer[]>) => {
                state.isLoading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch customers.';
            });
    },
})

export default customerSlice.reducer;