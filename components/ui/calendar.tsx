/* components/ui/calendar.tsx */
'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className={className}
      showOutsideDays
      ISOWeek
    />
  );
}
export default Calendar;
