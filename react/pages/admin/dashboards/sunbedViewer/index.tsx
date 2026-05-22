import { MetaData } from "@/components/MetaData";
import { PageTitle } from "@/components/PageTitle";
import { StatList } from "./components/BedCard/BedList";
import { Overview } from "./components/Overview";



export default function SunbedViewer(){
    return(<>
            <MetaData title="Sunbed Dashboard" />

            <PageTitle
                title="Sunbed Dashboard"
                items={[{ label: "Dashboards" }, { label: "Sunbeds", active: true }]}
            />

            <div className="mt-6 flex flex-col lg:flex-row gap-6">
                {/* This div will take up 2/3 of the width on large screens */}
                <div className="w-full lg:w-2/3">
                    <StatList />
                </div>
                {/* This div will take up 1/3 of the width on large screens */}
                <div className="w-full lg:w-2/5">
                    <Overview />
                </div>
            </div>
            
    </>);
}