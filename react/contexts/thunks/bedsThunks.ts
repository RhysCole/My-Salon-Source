import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from '@/lib/supabaseClient';
import { type RootState } from "@/contexts/store";
import { type ISunbedData } from "@/Models/types";

export const fetchBeds = createAsyncThunk<ISunbedData[], void, { state: RootState }>(
    "beds/fetchBeds",
    async (_: void, { getState }) => {
        const state = getState();
        const companyId = state.user.profile?.companyId;
        const salonId = state.user.profile?.salonId; 
        
        if(!companyId){
            throw new Error("user must be logged in and have a company id to fetch beds");
        } 

        const {data, error} = await supabase.rpc('get_equipment', {
            company_id_input: companyId,
            salon_id_input: salonId
        })

        if(error){
            throw error;
        }
        
        type SupabaseBed = {
            id: number;
            name: string;
            type: string;
            model: string;
            status: string;
            purchase_date: string | null;
            nickname: string;
            location_in_salon: string;
        };

        const sunbedData: ISunbedData[] = (data as SupabaseBed[]).map((item) => ({
            id: String(item.id),
            name: item.name,
            type: item.type,
            model: item.model,
            oporational: item.status === "operational", 
            purchaseDate: item.purchase_date
            ? new Date(item.purchase_date)
            : null,
            nickname: item.nickname,
            location: item.location_in_salon,
        }));

        return sunbedData;
    }
);