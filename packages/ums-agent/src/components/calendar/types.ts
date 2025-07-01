export interface BaseCalendarProps {
    initialDate?: Date | null;
}
  
export interface CalendarSingleProps extends BaseCalendarProps {
    onSingleDateChange?: (date: Date | null) => void;
}

export interface CalendarRangeProps extends BaseCalendarProps {
    onDateRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
    initialRange?: { start: Date | null; end: Date | null };
}

export interface CalendarProps extends BaseCalendarProps {
    mode?: 'range' | 'single';
    onDateRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
    onSingleDateChange?: (date: Date | null) => void;
    initialRange?: { start: Date | null; end: Date | null };
}