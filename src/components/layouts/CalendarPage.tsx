"use client"
import { useEffect, useState } from "react";
import clsx from "clsx";

import { CustomCalendar, CalendarContext } from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import DayEventList from "@/components/features/dayEventList/DayEventList";
import { useDateState } from "@/hooks";
import { CalendarEventType } from "@/@types/calendar";
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api";
import { calendarService } from "@/api/service/calendar";
import { useStore } from "zustand";
import { useAuthStore } from "@/store";
const contents =clsx(
  "w-full h-full flex gap-[20px] bg-yoteyo-gray-100",
  "xl:p-[30px] xl:pb-[5px]",
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
  //캘린더 선택시 이밴트 동작

  const handleSetSelectedDate = (today: Date) => {
    setSelectedDate(today);
    const selectedDayStart = startOfDay(today);
    const selectedDayEnd = endOfDay(today);

    const filtered = data?.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      // 선택한 날짜가 이 이벤트 범위 안에 포함되어 있으면 true
      return isWithinInterval(selectedDayStart, { start: eventStart, end: eventEnd }) ||
            isWithinInterval(selectedDayEnd, { start: eventStart, end: eventEnd }) ||
            isWithinInterval(eventStart, { start: selectedDayStart, end: selectedDayEnd });
    });

    setDayEvents(filtered||[]);
  };

  // useQuery 적용
  const year = currentDate.getFullYear();
  const { user } = useStore(useAuthStore);
  // year 파라미터를 클로저로 캡쳐해서 사용? (year)=>calendarService.getEvents(year) X
  const {data}= useQuery({
    queryKey : queryKeys.calendar.events(year).queryKey,
    queryFn : ()=> calendarService.getEvents(year, user!.calendarId),
    enabled: !!user?.calendarId,
  })
  
  useEffect(()=>{
    console.log('data changed:', data);
  },[data])

  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CalendarContext.Provider
          value={{
            events: data||[],
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