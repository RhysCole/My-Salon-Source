import { CustomerCard } from "./CustomerInfoCard";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomerVisits } from "@/utils/fetchCustomerVisits";
import { useSelector } from "react-redux";
import type { RootState } from "@/contexts/store";
import { PastVisitsTable } from "./PastVisitsTable";
import { CustomerPackages } from "./CustomerPackages";
import { useAddQueue } from "../Context";



export default function CustomerInfo() {

    const { selectedCustomer } = useAddQueue();
    const companyId = useSelector((state: RootState) => state.user.profile?.companyId)

    const { data, error } = useQuery({
        queryKey: ['customer_visits', selectedCustomer!.id],
        queryFn: () => fetchCustomerVisits(selectedCustomer!.id, companyId as string),
        enabled: !!selectedCustomer && !!companyId
    })

    if (error) throw error

    return (
        // 1. Create a flex container to hold the two components
        <div className="flex flex-col lg:flex-row gap-6">

            {/* 2. Left Column */}
            <div className="w-full lg:w-1/2">
                <div className="bg-base-200 rounded-box flex flex-col items-center gap-1 p-3 text-sm">
                    <span className="countdown text-xl md:text-3xl">
                        {selectedCustomer!.minutes}
                    </span>
                    Minutes
                </div>
                <CustomerCard customer={selectedCustomer!} />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="h-1/2 overflow-auto">
                    <PastVisitsTable pastVisits={data ? data : []} />
                </div>
                <div className="h-1/2 overflow-auto">
                    <CustomerPackages packages={selectedCustomer!.packages} />
                </div>
            </div>

        </div>
    )
}