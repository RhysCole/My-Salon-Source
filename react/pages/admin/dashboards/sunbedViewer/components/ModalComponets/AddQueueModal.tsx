import { ModalStep } from "./ModalSteps";
import { SearchTable } from "./Selection/SearchTable";
import { ProductsPage } from "./Products/ProductsPage";
import { Toggle } from "@/pages/admin/dashboards/sunbedViewer/components/ModalComponets/Selection/Toggle";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import { AddQueueProvider, useAddQueue } from "./Context"; // Import the provider and hook

const AddQueueModalContent = () => {
    const {
        page,
        changePage,
        reset,
        transitionCondition,
        contentKey,
        isGuest,
        setGuest,
    } = useAddQueue();

    const pages = [
        isGuest ? <h1> this is a guest tab</h1> : <SearchTable key={contentKey} />,
        <CustomerInfo/>,
        <ProductsPage/>,
    ];

    return (
        <div className="modal-box w-11/12 max-w-5xl">
            <ModalStep pageNumber={page} />
            {pages[page - 1]}
            <div className="modal-action">
                {page > 1 ? <button className="btn btn-soft mr-180" onClick={() => changePage(-1)}>Back</button> :
                    <Toggle classname={`${transitionCondition ? 'mr-180' : 'mr-205'}`} key={contentKey}
                        setGuest={setGuest} />}
                <div className="flex gap-5">
                    <form method="dialog">
                        <button className="btn btn-soft btn-error" onClick={reset}>Close</button>
                    </form>
                    {transitionCondition && <button type="submit" onClick={() => { changePage(1) }} className="btn btn-primary btn-soft">Submit</button>}
                </div>
            </div>
        </div>
    );
};


export function AddQueueModal() {
    return (
        <AddQueueProvider>
            <AddQueueModalContent />
        </AddQueueProvider>
    );
}