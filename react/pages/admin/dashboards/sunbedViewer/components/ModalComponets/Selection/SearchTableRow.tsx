import { useTheme } from "@/hooks/useTheme";

interface SearchTableRowProps {
    name: string;
    DOB: string | null;
    phoneNumber: string| null;
    eMail: string | null;
    selected: boolean;
    onClick: () => void;
}

export function SearchTableRow({ name, DOB, phoneNumber, eMail, onClick, selected }: SearchTableRowProps) {
    const { isDarkMode } = useTheme();

    return (
        <tr
            className={` ${selected ? `${isDarkMode? 'bg-white/20' : 'bg-black/20'}` : "cursor-pointer *:text-nowrap hover:bg-base-200/40"}`}
            onClick={onClick}
        >
            <td>{name}</td>
            <td>{DOB}</td>
            <td className="text-sm font-medium">{phoneNumber}</td>
            <td className="text-sm">{eMail}</td>
        </tr>);
}