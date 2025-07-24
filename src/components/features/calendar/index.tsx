'use client'
import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api";

import { calendarService } from "@/api/service/calendar";
import { CalendarContext } from "./provider/CalendarContext";

import CalendarView from "./ui/View";

type CustomCalendarType = {
  children : ReactNode
  calendarHightPx : string
  calendarWidthPx : string
}
function CustomCalendar({children, calendarHightPx, calendarWidthPx}:CustomCalendarType){
  const {data,status} = useQuery({
    queryKey : queryKeys.calendar.events().queryKey,
    queryFn : calendarService.events 
  })

  const [currentDate, setCurrentDate] = useState(new Date());

  if (status === 'pending') return <p>이벤트를 불러오는 중입니다...</p>;
  if (status !== 'success') return null;
  return (
    <CalendarContext.Provider value={{
      events : data?.events || [],
      isMondayStart : data?.isMondayStart||true,
      currentDate:currentDate,
      setCurrentDate : setCurrentDate,
      calendarHight: calendarHightPx,
      calendarWidth : calendarWidthPx
      }}>
      {children}
    </CalendarContext.Provider>
  )
}

CustomCalendar.View = CalendarView;

export default CustomCalendar;