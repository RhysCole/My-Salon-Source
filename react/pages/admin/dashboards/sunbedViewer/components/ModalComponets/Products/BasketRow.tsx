import { useAddQueue } from "../Context";

// --- A helper function for formatting currency ---
// This uses the built-in Internationalization API to correctly format the price.
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP', // Great British Pounds
    }).format(price);
};


// --- The Corrected BasketRow Component ---

interface BasketRowProps {
    product: string;
    price: number;
    icon: string;
    id: string; // Use the unique cart item ID for removal
}

export function BasketRow({ product, price, icon, id }: BasketRowProps) {
    // Get the remove function from your context
    const { removeItemFromCart } = useAddQueue();

    return (
        <tr>
            <td>
                <span className={`iconify lucide--${icon} size-4.5`}></span>
            </td>
            <td className="flex items-center space-x-3 truncate">
                <p>{product}</p>
            </td>
            {/* Use the formatPrice function to display the price */}
            <td className="font-medium">{formatPrice(price)}</td>
            <td>
                <div className="flex items-center gap-1">
                    <button
                        aria-label="Remove item"
                        className="btn btn-square btn-error btn-outline btn-xs border-transparent"
                        // Call the remove function with the item's unique ID
                        onClick={() => removeItemFromCart(id)}
                    >
                        <span className="iconify lucide--trash size-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
