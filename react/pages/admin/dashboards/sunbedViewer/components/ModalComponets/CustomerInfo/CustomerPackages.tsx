import type { IPackage } from "@/Models/types";
import { CPTRow } from "./CPTRow";

interface props{
    packages: IPackage[] | null,
}



export function CustomerPackages({packages} : props) {
    return (<div aria-label="Card" className="card bg-base-100 shadow">
        <div className="card-body p-0">
            <div className="flex items-center justify-between gap-2 px-5 pt-5">
                <span className="iconify lucide--package-search text-base-content/80 size-4.5" />
                <span className="grow font-medium">Customer Packages</span>
            </div>
            <div className="mt-1 overflow-auto">
                <table className="table *:text-nowrap">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Minutes</th>
                            <th>Expirary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages?.map((item, index) => {
                            return <CPTRow {...item} key={index}/>
                        } )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}