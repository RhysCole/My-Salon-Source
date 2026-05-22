import { Queue } from "./Queue";
import { BedProgress } from "./BedCard/BedProgress";
import { AddQueueModal } from "./ModalComponets/AddQueueModal";

export const Overview = () => {
    return (
        <div className="card bg-base-100 card-border">
            <div className="card-body gap-0">
                <p className="mt-6 text-xl font-medium">In Process</p>
                <div className="mt-3 mb-8">
                    <BedProgress />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Queue</h2>
                    <button className="btn btn-info btn-sm"
                        onClick={() => document.querySelector<HTMLDialogElement>("#add-queue-modal")?.showModal()}>
                        Add to Queue
                    </button>
                    <dialog id="add-queue-modal" className="modal">
                        <AddQueueModal/>
                    </dialog>
                </div>
                <div className="mt-3 overflow-hidden">
                    <Queue />
                </div>
            </div>
        </div>
    );
};
