import { BedItem } from "./BedItem";

import { useSelector } from "react-redux";
import { type RootState } from "@/contexts/store";



export const StatList = () => {
    const { beds, isLoading, error } = useSelector((state: RootState) => state.beds);
    

    if (isLoading) {
        return <div>Loading sunbed information...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {beds.map((bed, index) => (
                <BedItem {...bed} key={index} />
            ))}
        </div>
    );
};