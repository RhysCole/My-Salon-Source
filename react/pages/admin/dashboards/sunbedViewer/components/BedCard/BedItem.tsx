import type { IBedObject, UserProfile } from "@/Models/types";
import { useDispatch } from "react-redux";
import { startSession, finishSession, markAsCleaned, addUser } from "@/contexts/slices/bedSlice";
import { useState, useEffect } from "react";


const statusConfig = {
    Available: { class: 'btn btn-info w-full', text: 'Add a User' },
    Ready: { class: 'btn btn-success w-full', text: 'Start Session' },
    'In Use': { class: 'btn btn-error w-full', text: 'Finish Session' },
    Cleaning: { class: 'btn btn-warning w-full', text: 'Mark as Cleaned' },
    Maintenance: { class: 'btn btn-neutral w-full', text: 'Unavailable' },
};

const buttonClasses = {
    opporational: "iconify lucide--arrow-up size-3.5 success",
    unopporational: "iconify lucide--arrow-down size-3.5",
    opporationalDiv: "badge badge-soft badge-success badge-sm gap-0.5 px-1 font-medium",
    unopporationalDiv: "badge badge-soft badge-error badge-sm gap-0.5 px-1 font-medium",
}

const testUser: UserProfile = {
    firstName: "Rhys william cole",
    role: "Manager",
    companyId: "158a7d4b-1d96-4a6b-b38e-150fb4d7ca64",
    salonId: "d41729e5-c81c-4cb7-bb8e-b4da0f86ea16",
};

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const BedItem = (props: IBedObject) => {
    const { bedInfo, status, currentUser, times } = props;
    const dispatch = useDispatch();

    const [secondsLeft, setSecondsLeft] = useState(0);

    // This useEffect hook manages the countdown timer.
    useEffect(() => {
        // If the bed is not 'In Use' or has no end time, do nothing.
        if (status !== 'In Use' || !times?.endTime) {
            setSecondsLeft(0);
            return;
        }

        // Set up an interval that runs every 1000 milliseconds (1 second).
        const interval = setInterval(() => {
            const endTime = new Date(times.endTime);
            const now = new Date();

            // Calculate the time remaining in seconds.
            const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));

            setSecondsLeft(remaining);

            // When the timer reaches zero, dispatch the finishSession action.
            if (remaining <= 0) {
                if (bedInfo?.id) {
                    dispatch(finishSession({ bedId: bedInfo.id }));
                }
                clearInterval(interval); // Stop the timer
            }
        }, 1000);

        // This is a cleanup function. It stops the timer if the component is removed
        // or if the dependencies in the array below change.
        return () => clearInterval(interval);

    }, [status, times, dispatch, bedInfo?.id]);

    const buttonAppearance = statusConfig[status] || statusConfig.Maintenance;

    const handleStatusCycle = () => {
        if (!bedInfo?.id) return; // Safety check

        switch (status) {
            case 'Available':
                dispatch(addUser({ bedId: bedInfo.id, user: testUser as UserProfile }))
                break;
            case 'Ready':
                dispatch(startSession({ bedId: bedInfo.id, user: testUser as UserProfile, sessionId: 'new-session-id', duration: 5 }));
                setSecondsLeft(5 * 60);
                break;
            case 'In Use':
                dispatch(finishSession({ bedId: bedInfo.id }));
                break;
            case 'Cleaning':
                dispatch(markAsCleaned({ bedId: bedInfo.id }));
                break;
            default:
                break;
        }
    };

    return (
        <div className="card bg-base-100 shadow h-70">
            <div className="card-body flex flex-col gap-2">
                <div>
                    <div className="flex items-start justify-between gap-2 text-sm">
                        <div>
                            <p className="text-base-content/80 font-medium">
                                {bedInfo?.location}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                                <p className="text-3xl font-bold">{bedInfo?.nickname}</p>
                            </div>
                        </div>
                        <div className="bg-base-200 rounded-box flex items-center p-2">
                            <button className={`iconify size-5 lucide--info`} />
                        </div>
                    </div>

                    <p className="text-base-content/60 text-sm">
                        type - <span className="mx-1"></span>
                        {bedInfo?.type}
                    </p>
                    {status === 'In Use' && secondsLeft > 0 ? (
                        <div className="badge badge-soft badge-error badge-sm gap-1 px-2 font-medium">
                            <span className="iconify lucide--timer size-3.5" />
                            <span>Time Left: {formatTime(secondsLeft)}</span>
                        </div>
                    ) :
                        <div
                            className={
                                bedInfo?.oporational
                                    ? buttonClasses.opporationalDiv
                                    : buttonClasses.unopporationalDiv
                            }
                        >
                            <span>
                                {" "}
                                <span
                                    className={
                                        bedInfo?.oporational
                                            ? buttonClasses.opporational
                                            : buttonClasses.unopporational
                                    }
                                />
                                {bedInfo?.oporational ? "Operational" : "Offline"}
                            </span>



                        </div>}
                </div>

                {/* This spacer div pushes the buttons to the bottom */}
                <div className="flex-grow"></div>

                {/* This button displays the current user */}
                <button className="btn btn-dash btn-neutral w-full">
                    {currentUser ? currentUser.firstName : "No User Assigned"}
                </button>

                {/* The main action button */}
                <div className="card-actions mt-4">
                    <button
                        className={buttonAppearance.class}
                        onClick={handleStatusCycle}
                    >
                        {buttonAppearance.text}
                    </button>
                </div>
            </div>
        </div>
    );
};
