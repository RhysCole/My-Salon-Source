import { useAddQueue } from "../../Context"
import { MinuteSelector } from "./MinuteSelector"

export function TanningContent() {

    const {selectedCustomer} = useAddQueue()

    return (<div>
        <div className="w-full">
            <div className="bg-base-200 rounded-box flex flex-col items-center gap-1 p-3 text-sm">
                <span className="countdown text-xl md:text-3xl">
                    {selectedCustomer?.minutes}
                </span>
                Customer Minutes
            </div>
        </div>

        <MinuteSelector/>

    </div>)
}