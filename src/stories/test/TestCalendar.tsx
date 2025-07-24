import clsx from "clsx";

import CustomCalendar from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import { CalendarContext } from '@/components/features/calendar/provider/CalendarContext';
import { useState } from "react";

const mobileContents = clsx(
  "m-0 p-0 border-1 border-soild",
  "min-w-[393px] min-h-[852px] max-w-[1280px] max-h-[852px]"
)

export default function TestCalendar(){
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className={mobileContents}>
      <CalendarContext.Provider
        value={{
          events: calendarEvents,
          isMondayStart: true,
          currentDate,
          setCurrentDate,
          calendarHight: "393px",
          calendarWidth :"852px"
        }}
      >
        <CustomCalendar.View />
      </CalendarContext.Provider>
    </div>
  );
}