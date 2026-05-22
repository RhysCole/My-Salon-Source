import type { IPackage } from "@/Models/types";
import { useAddQueue } from "../../Context";

export function PackageRow(props: IPackage) {
    const { addPackageToCart } = useAddQueue();

    return (<tr>
        <td className="font-medium">
            <p>{props.name}</p>
        </td>
        <td className="font-medium">{props.minutes_remaining}</td>
        <td className="font-medium">£{props.price}</td>
        <td>
            <div className="flex items-center gap-1">
                <button
                    aria-label="Remove item"
                    className="btn btn-square btn-success  btn-outline  border-transparent"
                    onClick={() => addPackageToCart(props)}
                >
                    <span className="iconify lucide--shopping-cart size-4" />
                </button>
            </div>
        </td>
    </tr>)
}