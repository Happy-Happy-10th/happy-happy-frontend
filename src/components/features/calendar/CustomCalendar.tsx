'use client'
import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api";

import { calendarService } from "@/api/service/calendar";
import { CalendarContext } from "./provider/CalendarContext";

import CalendarView from "./ui/View";
import { useDateState } from "@/hooks";
import { CalendarEventType } from "@/@types/calendar";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

type CustomCalendarType = {
  children : ReactNode
  calendarHightPx : string
  calendarWidthPx : string
}
export function CustomCalendar({children, calendarHightPx, calendarWidthPx}:CustomCalendarType){
   // useQuery 적용
  const [currentDate, setCurrentDate] = useDateState(new Date());
  const year = currentDate.getFullYear();
  // year 파라미터를 클로저로 캡쳐해서 사용? (year)=>calendarService.getEvents(year) X
  const {data}= useQuery({
    queryKey : queryKeys.calendar.events(year).queryKey,
    queryFn : ()=> calendarService.getEvents(year)
  })

  //캘린더에서 선택될 날짜 데이터
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayEvents, setDayEvents] = useState<CalendarEventType[]>([]);
  
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

  if (status === 'pending') return <p>이벤트를 불러오는 중입니다...</p>;
  if (status !== 'success') return null;
  return (
    <CalendarContext.Provider value={{
      events : data|| [],
      isMondayStart :true,
      currentDate:currentDate,
      handleCurrentDate : setCurrentDate,
      handleSetSelectedDate
      }}>
      {children}
    </CalendarContext.Provider>
  )
}

CustomCalendar.View = CalendarView;