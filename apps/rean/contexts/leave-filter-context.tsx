// FilterContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type LeaveFilterType = {
  status: string;
  dateRange: { start: Date | null; end: Date | null };
};

type LeaveFilterContextType = {
  filters: LeaveFilterType;
  setFilters: React.Dispatch<React.SetStateAction<LeaveFilterType>>;
};

const defaultFilters: LeaveFilterType = { status: '', dateRange: { start: null, end: null } };

const FilterContext = createContext<LeaveFilterContextType | undefined>(undefined);

export const LeaveFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<LeaveFilterType>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within a FilterProvider');
  return context;
};
