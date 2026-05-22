import type { RootState } from "@/contexts/store";
import QueueItem from "./QueueItem";
import { useSelector } from "react-redux";

export const Queue = () => {
    const queue = useSelector((state: RootState) => state.queue.queue)

    return (
        <ul className="timeline timeline-vertical timeline-snap-icon timeline-hr-sm -ms-[100%] ps-10">
            <QueueItem/>
            <QueueItem/>
            <QueueItem/>
            <QueueItem/>
            <li>
                <hr />
                <div className="timeline-middle">
                    <div className="bg-base-200 flex items-center rounded-full p-2">
                        <span className="iconify lucide--more-horizontal size-4" />
                    </div>
                </div>
                <div className="timeline-end mx-5 my-2">
                    <button className="btn btn-sm btn-soft btn-info">View Full Activity</button>
                </div>
            </li>
        </ul>
    );
};
