import { supabase } from "@/lib/supabaseClient";

export const fetchCustomerVisits = async (customerId: string, companyId: string) => {
    if (!customerId || !companyId) return [];
    
    const { data, error } = await supabase.rpc('get_customer_visits', {
        customer_id_input: customerId,
        company_id_input: companyId
    });

    if (error) throw error;
    return data;
};
