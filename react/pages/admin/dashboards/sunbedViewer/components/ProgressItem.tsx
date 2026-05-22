import { useState, useEffect } from "react";
import type { IBedObject } from "@/Models/types";
import { ScrollingText } from "./ScrollingText";

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function ProgressItem(props: IBedObject) {
    const { times, currentUser, bedInfo } = props;

    const [secondsLeft, setSecondsLeft] = useState(0);
    const [percentage, setPercentage] = useState(100);

    useEffect(() => {
        // If there are no times, do nothing.
        if (!times?.startTime || !times?.endTime) {
            return;
        }

        const interval = setInterval(() => {
            const startTime = new Date(times.startTime);
            const endTime = new Date(times.endTime);
            const now = new Date();

            const totalDuration = (endTime.getTime() - startTime.getTime()) / 1000;
            const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
            const currentPercentage = totalDuration > 0 ? (remaining / totalDuration) * 100 : 0;
            
            setSecondsLeft(remaining);
            setPercentage(currentPercentage);

        }, 1000);

 
        return () => clearInterval(interval);

    }, [times]);


    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="w-3/5">
                    <ScrollingText
                        text={currentUser?.firstName || "No User: Error"}
                        maxLength={10} 
                        className="font-bold max-sm:text-sm text-2xl italic"
                    />
                </div>
                <div>
                    {" "}
                    <p className="text-base-content/80 italic text-m">
                        {bedInfo?.nickname}
                    </p>
                </div>
                <div className="inline-flex gap-2">
                    <span className="iconify lucide--pause size-4" />
                    <span className="iconify lucide--x-circle text-error size-4" />
                </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
                <span>{Math.round(percentage)}%</span>
                <span>{formatTime(secondsLeft)}</span>
            </div>
            <progress
                className="progress progress-error h-1 align-super"
                max={100}
                value={percentage}
            />
        </div>
    );
}
