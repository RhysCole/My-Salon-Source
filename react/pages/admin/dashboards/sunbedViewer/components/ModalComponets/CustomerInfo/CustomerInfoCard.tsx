import { type ICustomer } from "@/Models/types";

// A helper type for the component's props
interface CustomerCardProps {
    customer: ICustomer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-primary text-primary-content ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            {customer.first_name?.[0]}{customer.last_name?.[0]}
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title text-2xl">{customer.first_name} {customer.last_name}</h2>
                        <p className="text-base-content/60">Customer Profile</p>
                    </div>
                </div>
                <div className="divider"></div>

                {/* Card Body - Contact & Personal Info */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="iconify lucide--mail text-base-content/70 size-5" />
                        <span className="font-medium">{customer.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="iconify lucide--phone text-base-content/70 size-5" />
                        <span className="font-medium">{customer.phone_number || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="iconify lucide--cake text-base-content/70 size-5" />
                        <span className="font-medium">{customer.date_of_birth || 'No DOB provided'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="iconify lucide--sun text-base-content/70 size-5" />
                        <span className="font-medium">Skin Type: {customer.skin_type || 'Not set'}</span>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Card Footer - Notes Section */}
                <div>
                    <h3 className="font-bold mb-2">Notes</h3>
                    <p className="text-base-content/80 text-sm bg-base-200 p-3 rounded-lg">
                        {customer.notes || 'No notes for this customer.'}
                    </p>
                </div>
            </div>
        </div>
    );
};
