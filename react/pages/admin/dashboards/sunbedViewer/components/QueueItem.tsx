export default function QueueItem() {
    return (
        <li>
            <div className="timeline-middle">
                <div className="bg-primary/10 text-primary flex items-center rounded-full p-2">
                    <span className="iconify lucide--pencil-line size-4" />
                </div>
            </div>
            <div className="timeline-end my-2.5 w-full px-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Olivia Duncan</span>
                    <span className="text-base-content/60 text-xs">Just Now</span>
                </div>
                <p className="text-base-content/70 mt-0.5 text-xs">Edited package.json in e-commerce</p>
            </div>
            <hr />
        </li>
    );
}