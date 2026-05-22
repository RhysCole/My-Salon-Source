import { useMemo } from "react";
import { getTimeAgo } from "@/utils/timeFrom";
import { useTheme } from "@/hooks/useTheme";

interface props{
    date: string,
    duration: number,
}

const levels = ['badge-success', 'badge-secondary', 'badge-warning', 'badge-error']

export function PVTRow({date, duration} : props){
    const timeAgo = useMemo(() => {
        return getTimeAgo(date);
    },[])

    const {isDarkMode} = useTheme()

    return(
        <tr>
            <td className="flex items-center space-x-3 truncate">
                <p>{date}</p>
            </td>
            <td className="font-medium">{duration}</td>
            <td>
                <div className={`badge ${levels[timeAgo.level - 1]} badge-sm ${isDarkMode && 'badge-soft'} `}>{timeAgo.value} {timeAgo.unit}</div>
            </td>
        </tr>
    );
}