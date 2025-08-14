'use client'

import { useMemo } from 'react';
// type
import { CalendarEventType } from '@/@types';
// react-big-calendar
import { Calendar, Components, SlotInfo, View } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
// CSS
import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
// CustomCalendar base Components
import {createLocalizer} from '@/utils';


const calendarVariants = cva(`
  [&_.rbc-row-bg]:!right-[0]
  [&_.rbc-date-cell]:!pr-0
  [&_.rbc-event]:!p-0
  [&_.rbc-today]:!bg-transparent
  [&_.rbc-off-range-bg]:!bg-transparent
  [&_.rbc-date-cell]:!pb-[4px]
  [&_.rbc-event]:!mb-[1px]
  [&_.rbc-event]:!bg-transparent
  [&_.rbc-event]:!pointer-events-none
  [&_.rbc-date-cell]:!flex
  [&_.rbc-date-cell]:!justify-center
  [&_.rbc-month-view]:!rounded-[8px]
  `,{
    variants : {
      variant : {
        clearBorder : `
          [&_.rbc-month-view]:!border-none
          [&_.rbc-day-bg]:!border-none
          [&_.rbc-header]:!border-none
          [&_.rbc-month-row]:!border-none
          `,
        default : ``
      }
    }
  }
)

type CustomCalendarPropsType={
  className?: string;
  viewDate ?: Date;
  events?: CalendarEventType[];
  view?:View;
  isMondayStart ?: boolean;
  onSelectSlot?: (slot: SlotInfo) => void;
  onNavigate?: (date:Date)=>void
  components?: Components<CalendarEventType, object>; // ✅ 제네릭 고정
}
export function CalendarGrid({
  className,
  viewDate = new Date(),
  events=[],
  view='month',
  isMondayStart =true,
  onSelectSlot,
  onNavigate,
  components

}:CustomCalendarPropsType){
  // 시작일이 바뀌지않으면 다시 연산하지 않음.
  const localizer = useMemo(
    () => createLocalizer(isMondayStart),
    [isMondayStart] );
    
  return(
    <Calendar
      className={cn(calendarVariants({variant:'clearBorder'}), className)}
      date={viewDate}
      events={events}
      view={view}
      startAccessor="startDate"
      endAccessor="endDate"
      localizer={localizer}
      selectable
      onSelectSlot={onSelectSlot}
      onNavigate={onNavigate}
      components={components}
    /> 
  )
}