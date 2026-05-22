import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";
import { type RootState } from "../store";
import { type ICustomer } from "@/Models/types";

export const fetchCustomers = createAsyncThunk<ICustomer[],void,{ state: RootState}>(
    'customers/fetchForCompany',
    async (_, {getState}) => {
        const state = getState();
        const companyId = state.user.profile?.companyId;

        if(!companyId){
            throw new Error("User's Company ID is not availible");
        }

        const {data, error} = await supabase.rpc('get_customers', {company_id_input: companyId});

        if(error) throw error;

        return data as ICustomer[];
    }
);
