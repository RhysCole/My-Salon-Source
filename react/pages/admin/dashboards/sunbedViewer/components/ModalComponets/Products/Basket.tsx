import { useAddQueue } from "../Context";
import { BasketRow } from "./BasketRow";

export function Basket() {
    const { cart } = useAddQueue();

    return (
        <div aria-label="Card" className="card bg-base-100 shadow">
            <div className="card-body p-0">
                <div className="flex items-center gap-3 px-5 pt-5">
                    <span className="iconify lucide--shopping-cart size-4.5" />
                    <span className="font-medium">Basket</span>
                </div>
                <div className="mt-2 overflow-auto">
                    <table className="table *:text-nowrap">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.minutes.map((product, index) => (
                                <BasketRow product={`${product.value} Mins`} price={product.price} key={`min-${index}`} icon='sun' id={product.cartItemId}/>
                            ))}
                            {cart.products.map((product, index) => (
                                <BasketRow product={product.name} price={product.sale_price} key={`prod-${index}`} icon='box' id={product.id}/>
                            ))}
                            {cart.packages.map((pkg, index) => (
                                <BasketRow product={pkg.name} price={pkg.price} key={`pkg-${index}`} icon='package' id={pkg.id}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}