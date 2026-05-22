import { Basket } from "./Basket";
import { TanningContent } from "./Tanning/TanningContent";
import { PackageTable } from "./Packages/PackageTable";

export function ProductsPage() {
    return (

        <div className="flex flex-col lg:flex-row gap-2">
            
            <div className="w-full lg:w-1/2">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="mt-1">
                            <div role="tablist" className="tabs tabs-lifted">
                                <input
                                    type="radio"
                                    name="demo-tabs-radio"
                                    role="tab"
                                    className="tab"
                                    aria-label="Tanning Minutes"
                                    defaultChecked
                                />
                                <div className="tab-content border-base-200 bg-base-100 p-6">
                                    <TanningContent/>
                                </div>

                                <input
                                    type="radio"
                                    name="demo-tabs-radio"
                                    role="tab"
                                    className="tab"
                                    aria-label="Products"
                                />
                                <div className="tab-content border-base-200 bg-base-100 p-6">
                                    <PackageTable/>
                                </div>

                                <input
                                    type="radio"
                                    name="demo-tabs-radio"
                                    role="tab"
                                    className="tab"
                                    aria-label="Packages"
                                />
                                <div className="tab-content border-base-200 bg-base-100 p-6">Tab content 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. This is the right column, taking up the remaining 1/3 of the width. */}
            <div className="w-full lg:w-1/2">
                <Basket />
            </div>

        </div>
    );
}