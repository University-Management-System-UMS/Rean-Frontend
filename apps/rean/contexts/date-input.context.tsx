import { CalendarProps } from '@repo/ums-agent';
import { usePathname } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Range = { start: Date | null; end: Date | null };

interface DateInputContextType extends CalendarProps {
  selectedDate: Date | null;
  selectedRange: Range;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedRange: React.Dispatch<React.SetStateAction<Range>>;
}

const DateInputContext = createContext<DateInputContextType>({
  selectedDate: null,
  selectedRange: { start: null, end: null },
  setSelectedDate: () => {},
  setSelectedRange: () => {},
});

// whitelist of routes that should not clear the context on route change
// if the pathname is not in the list, clear the context on route change, this prevent the value from begin
// to other routes
const WHITELIST = ['/view-attendance', '/calendar-screen', '/leave-review'];
export function ClearDateOnRouteChange() {
  const pathname = usePathname();
  const { setSelectedDate, setSelectedRange } = useDateInput();
  
  useEffect(() => {
    if (!WHITELIST.includes(pathname)) {
      // Clear the context when leaving allowed routes
      setSelectedDate(null);
      setSelectedRange({ start: null, end: null});
    }
    
  }, [pathname]);

  return null;
}

export const DateInputProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<Range>({ start: null, end: null });

  return (
    <DateInputContext.Provider
      value={{
        selectedDate,
        selectedRange,
        setSelectedDate,
        setSelectedRange,
      }}
    >
      {children}
    </DateInputContext.Provider>
  );
};

export const useDateInput = () => useContext(DateInputContext);
