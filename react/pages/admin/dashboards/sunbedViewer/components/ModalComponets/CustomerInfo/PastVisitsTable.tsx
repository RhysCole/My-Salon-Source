import { PVTRow } from "./PVTRow"

interface visitItem{
    bed_name: string,
    duration: number,
    visit_date: string,
}

interface props {
    pastVisits: visitItem[]
}

export function PastVisitsTable({ pastVisits }: props) {
    return (
        <div aria-label="Card" className="card bg-base-100 shadow">
            <div className="card-body p-0">
                <div className="flex items-center justify-between gap-2 px-5 pt-5">
                    <span className="iconify lucide--handshake text-base-content/80 size-4.5" />
                    <span className="grow font-medium">Past Sessions</span>
                </div>
                <div className="mt-1 overflow-auto">
                    <table className="table *:text-nowrap">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Time Ago</th>
                            </tr>
                        </thead>
                        <tbody>

                            {pastVisits.slice(0,5).map((item, index) => {
                                return (<PVTRow date={item.visit_date.split(' ')[0]} duration={item.duration} key={index}/>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}