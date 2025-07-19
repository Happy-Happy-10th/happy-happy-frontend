import { CalendarEventType } from "@/@types/calendar";
import { createContext, useContext } from "react";


type CalendarContextType = {
  events : CalendarEventType[];
  isMondayStart : boolean;
  currentDate : Date;
  setCurrentDate : React.Dispatch<React.SetStateAction<Date>>;
  calendarHight: string;
}

export const CalendarContext = createContext<CalendarContextType|null>(null);

export function useCalendarContext(){
  const calendarCtx = useContext(CalendarContext);
  if(!calendarCtx) throw new Error('useCalendarContext must be inside <UserCalendar>')
  return calendarCtx;
}