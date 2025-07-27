import { useState } from "react";
import clsx from "clsx";

import { format } from 'date-fns';
import {ko} from "date-fns/locale";

import { CustomCalendar, CalendarContext } from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import CalendarEvent from "@/components/features/calendar/ui/DetailEvent";
import { Plus } from "lucide-react";
import DayEventListHead from "@/components/features/dayEventList/ui/DayEventListHead";
import DayEventBox from "@/components/features/dayEventList/ui/DayEventBox";
import DayEventList from "@/components/features/dayEventList/DayEventList";

const viewSize = clsx(
  "m-0 p-0 box-content border-1 border-soild",
  "min-w-[393px] min-h-[852px] max-w-[1280px] max-h-[800px]",
  "w-full h-full",
  "flex flex-col lg:flex-row",
  "bg-yoteyo-gray-100"
)

const calendarSize = clsx(
  "m-[30px] p-0 bg-white r",
  "h-[90%] w-[70%]"
)

const eventList = clsx(
  "m-0 p-[30px]",
  "w-[30%]",
  ""
)
export default function TestCalendar(){
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={viewSize}>
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