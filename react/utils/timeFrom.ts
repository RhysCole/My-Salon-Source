interface TimeAgoResult {
    level: number; // 1 = days, 2 = weeks, 3 = months, 4 = years
    value: number;
    unit: 'day' | 'week' | 'month' | 'year'; // Added for clarity
}

/**
 * Correctly parses a date string in "yyyy-mm-dd" format.
 */
function parseDate(dateStr: string): Date {
    // This now correctly handles the "yyyy-mm-dd" format from your database.
    return new Date(dateStr);
}

export function getTimeAgo(pastDateStr: string, now: Date = new Date()): TimeAgoResult {
    // Safety check for null or invalid date strings
    if (!pastDateStr) {
        return { level: 4, value: 0, unit: 'year' };
    }

    const pastDate = parseDate(pastDateStr);
    // Check if the parsed date is valid
    if (isNaN(pastDate.getTime())) {
        return { level: 4, value: 0, unit: 'year' };
    }

    const diffMs = now.getTime() - pastDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        return { level: 1, value: diffDays, unit: 'day' };
    }
    if (diffDays < 30) {
        const diffWeeks = Math.floor(diffDays / 7);
        return { level: 2, value: diffWeeks, unit: 'week' };
    }
    if (diffDays < 365) {
        const diffMonths = Math.floor(diffDays / 30.44); // Use average month length
        return { level: 3, value: diffMonths, unit: 'month' };
    }

    const diffYears = Math.floor(diffDays / 365.25); // Account for leap years
    return { level: 4, value: diffYears, unit: 'year' };
}