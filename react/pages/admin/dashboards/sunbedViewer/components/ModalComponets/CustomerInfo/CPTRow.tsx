import { useTheme } from "@/hooks/useTheme";
import type { IPackage } from "@/Models/types";

function isCourseExpired(dateStr: string): boolean {
  const [year, month, day] = dateStr.split("-").map(Number);
  const expiryDate = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return expiryDate < today;
}

export function CPTRow(props : IPackage) {
    const {isDarkMode} = useTheme()

    return (<tr>
        <td className="flex items-center space-x-3 truncate">
            <p>{props.name}</p>
        </td>
        <td className="font-medium">{props.minutes_remaining}</td>
        <td className={`badge ${isCourseExpired(props.expiry_date) ? 'badge-error' : 'badge-success'} ${isDarkMode && 'badge-soft'} badge-sm`}>{props.expiry_date}</td>
    </tr>)
}