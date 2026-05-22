import { useConfig } from "@/contexts/config";
import { useMemo } from "react";

export const useTheme = () => {
    const { config } = useConfig();
    const theme = config.theme;

    const isDarkMode = useMemo(() => {
        if (theme === 'system') {
            return true; 
        }
        if (theme.includes('dark') || theme === 'dim') {
            return true;
        }
        return false;
    }, [theme]); 
    return { isDarkMode };
};