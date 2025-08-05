"use client"
import { useState } from "react";
import clsx from "clsx";

import { CustomCalendar, CalendarContext } from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import DayEventList from "@/components/features/dayEventList/DayEventList";
import { useDateState } from "@/hooks";
import { CalendarEventType } from "@/@types/calendar";
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';
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
export default function CalendarPage(){
  //캘린더에 View 될 날짜 데이터
  const [currentDate, setCurrentDate] = useDateState(new Date());

  //캘린더에서 선택될 날짜 데이터
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayEvents, setDayEvents] = useState<CalendarEventType[]>([]);
  
  const handleSetSelectedDate = (today: Date) => {
  setSelectedDate(today);
  const selectedDayStart = startOfDay(today);
  const selectedDayEnd = endOfDay(today);
  const filtered = calendarEvents.filter((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    // 선택한 날짜가 이 이벤트 범위 안에 포함되어 있으면 true
    return isWithinInterval(selectedDayStart, { start: eventStart, end: eventEnd }) ||
          isWithinInterval(selectedDayEnd, { start: eventStart, end: eventEnd }) ||
          isWithinInterval(eventStart, { start: selectedDayStart, end: selectedDayEnd });
  });

  setDayEvents(filtered);
};

  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            handleCurrentDate:setCurrentDate,
            handleSetSelectedDate
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
      <div className={eventList}>
        <DayEventList selectedDate={selectedDate} dayEvents={dayEvents}/>
      </div>
    </div>
  );
}