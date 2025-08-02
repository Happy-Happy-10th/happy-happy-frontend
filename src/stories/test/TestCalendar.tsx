import { useState } from "react";
import clsx from "clsx";

import { CustomCalendar, CalendarContext } from '@/components/features/calendar';
import { calendarEvents, calendarEventsNone } from '@/@mock/calendar';
import DayEventList from "@/components/features/dayEventList/DayEventList";

const contents =clsx(
  "w-full h-full flex gap-[20px] bg-yoteyo-gray-100",
  "flex-col xl:flex-row",
)

const calendarSize = clsx(
  "bg-white flex-1",
  "min-h-[220px] xl:min-h-0",
  "ml-[20px] mr-[20px] mt-[26px]",
  "xl:ml-0 xl:mr-0 xl:mt-0"
)

const eventList = clsx(
  "bg-white",
  "xl:w-[304px] h-[187px] xl:h-auto xl:mt-[48px]",
  "rounded-[8px]"
)
export default function TestCalendar(){
  //캘린더에 View 될 날짜 데이터
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleCurrentDate = (updater: Date | ((prev: Date) => Date)) => {
    setCurrentDate(typeof updater === "function" ? updater(currentDate) : updater);
  };

  //캘린더에서 선택될 날짜 데이터
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            handleCurrentDate,
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
      <div className={eventList}>
        <DayEventList selectedDate={selectedDate} dayEvents={calendarEventsNone}/>
      </div>
    </div>
  );
}