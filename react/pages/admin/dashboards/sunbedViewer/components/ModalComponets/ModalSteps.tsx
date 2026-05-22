const modalSteps = [
    'Select Customer',
    'Customer Info',
    'Products',
    'Payment',
    'Confirmation'
]

interface props{
    pageNumber: number
}

export function ModalStep({pageNumber}: props) {
    return (
        <div className="card bg-base-100 h-full overflow-auto">
            <div className="card-body flex items-center justify-center">
                <div className="overflow-auto">
                    <ul className="steps steps-vertical lg:steps-horizontal lg:gap-x-6">
                        {modalSteps.map((item, index) => {
                            return (
                                <li key={index} className={`step ${index < pageNumber && "step-primary"}`}>{item}</li>
                        )})}
                    </ul>
                </div>
            </div>
        </div>
    );
}
