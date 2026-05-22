import { useSelector } from "react-redux";
import { type RootState } from "@/contexts/store";
import ProgressItem from ".././ProgressItem";

export const BedProgress = () => {
    const { beds } = useSelector((state: RootState) => state.beds);

    return (
        <div className="card card-border border-base-300">
            <div className="card-body px-4 pt-3 pb-2">
                {beds.
                    filter((bed) => bed.status === 'In Use').
                    map((activeBed) => (
                        <ProgressItem {...activeBed} key={activeBed.bedInfo?.id}/>
                    ))
                }
            </div>
        </div>
    );
};
