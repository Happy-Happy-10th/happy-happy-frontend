import { CalendarEventType } from "@/@types/calendar";
import { createContext, useContext } from "react";


type CalendarContextType = {
  events : CalendarEventType[]|[];
  isMondayStart : boolean;
  currentDate : Date;
  handleCurrentDate : (updater: Date | ((prev: Date) => Date)) => void
  handleSetSelectedDate:(today:Date) => void
}

export const CalendarContext = createContext<CalendarContextType|null>(null);

export function useCalendarContext(){
  const calendarCtx = useContext(CalendarContext);
  if(!calendarCtx) throw new Error('useCalendarContext must be inside <UserCalendar>')
  return calendarCtx;
}