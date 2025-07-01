// Calendar.tsx
import React from 'react';
import { CalendarSingle } from './calendar-single';
import { CalendarRange } from './calendar-range';
import { CalendarProps } from './types';

/**
 * A full-screen calendar component that supports both single date and date range selection.
 * 
 * @component
 * @example
 * // Single date selection
 * <Calendar
 *   mode="single"
 *   onSingleDateChange={(date) => console.log('Selected date:', date)}
 * />
 * 
 * // Date range selection
 * <Calendar
 *   mode="range"
 *   onDateRangeChange={({ start, end }) => console.log('Selected range:', start, end)}
 *   initialRange={{ start: new Date(), end: null }}
 * />
 */
export const Calendar: React.FC<CalendarProps> = ({
  mode = 'range',
  onDateRangeChange,
  onSingleDateChange,
  initialDate,
  initialRange,
}) => {
  if (mode === 'single') {
    return (
      <CalendarSingle
        onSingleDateChange={onSingleDateChange}
        initialDate={initialDate}
      />
    );
  }

  return (
    <CalendarRange
      onDateRangeChange={onDateRangeChange}
      initialDate={initialDate}
      initialRange={initialRange}
    />
  );
};

export { CalendarSingle } from './calendar-single';
export { CalendarRange } from './calendar-range';
export * from './types';