import { useState } from "react";
import clsx from "clsx";

import { CustomCalendar, CalendarContext } from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import DayEventList from "@/components/features/dayEventList/DayEventList";

const contents =clsx(
  "w-full h-full flex gap-[20px]",
  "flex-col xl:flex-row",
)

const calendarSize = clsx(
  "bg-white flex-1",
  "min-h-[220px] xl:min-h-0"
  // "xl:w-[calc(100%-304px)] xl:h-full",
  // "w-full h-[calc(100%-220px)]"
)

const eventList = clsx(
  "bg-white",
  "xl:w-[304px] h-[220px] xl:h-auto",
  "rounded-[8px]"
  // "xl:w-[304px] xl:h-full",
  // "w-full h-[220px]"
)
export default function TestCalendar(){
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            setCurrentDate,
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
      <div className={eventList}>
        <DayEventList selectedDate={selectedDate} dayEvents={calendarEvents}/>
      </div>
    </div>
  );
}