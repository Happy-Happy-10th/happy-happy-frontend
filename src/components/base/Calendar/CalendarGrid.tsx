'use client';

import { useMemo, useRef } from 'react';
import { CalendarEventType, SetDateHandler } from '@/@types';
// react-big-calendar
import { Calendar, CalendarProps, Components, SlotInfo, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// CSS
import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
// CustomCalendar base Components
import { createLocalizer } from '@/utils';
import { useCalendarSwipeWheelNav } from '@/hooks';
import { addMonths, subMonths } from 'date-fns';

//[&_.rbc-month-row]:!border-none : 주 선제거
//[&_.rbc-header]:!border-none : monthHeader 보더제거
const calendarVariants = cva(
  `
  [&_.rbc-row-bg]:!right-[0]
  [&_.rbc-date-cell]:!pr-0
  [&_.rbc-event]:!p-0
  [&_.rbc-today]:!bg-transparent
  [&_.rbc-off-range-bg]:!bg-transparent
  [&_.rbc-date-cell]:!pb-[4px]
  [&_.rbc-event]:!mb-[1px]
  [&_.rbc-event]:!bg-transparent
  [&_.rbc-event]:!pointer-events-none
  [&_.rbc-month-view]:!rounded-[8px]
  [&_.rbc-show-more]:!w-full
  [&_.rbc-show-more]:!text-center
  [&_.rbc-show-more]:!text-yoteyo-gray-300
  `,
  {
    variants: {
      variant: {
        plain: `
          [&_.rbc-month-view]:!border-none
          [&_.rbc-day-bg]:!border-none
          [&_.rbc-month-view_.rbc-header]:!border-b
          [&_.rbc-month-view_.rbc-header+_.rbc-header]:!border-l-0
          `,
        default: ``,
      },
    },
  },
);

type CustomCalendarPropsType = {
  className?: string;
  viewDate?: Date;
  events?: CalendarEventType[];
  view?: View;
  isMondayStart?: boolean;
  onSelectSlot?: (slot: SlotInfo) => void;
  onNavigate?: SetDateHandler;
  components?: Components<CalendarEventType, object>; //제네릭 고정
  messages?: CalendarProps<CalendarEventType>['messages'];
};
export function CalendarGrid({
  className,
  viewDate = new Date(),
  events = [],
  view = 'month',
  isMondayStart = true,
  onSelectSlot,
  onNavigate,
  components,
  messages,
}: CustomCalendarPropsType) {
  // 시작일이 바뀌지않으면 다시 연산하지 않음.
  const localizer = useMemo(() => createLocalizer(isMondayStart), [isMondayStart]);
  //캘린더 달 이동 훅 처리
  const onPrev = () => onNavigate?.(prev => subMonths(prev, 1));
  const onNext = () => onNavigate?.(prev => addMonths(prev, 1));

  const targetRef = useRef<HTMLDivElement | null>(null);
  useCalendarSwipeWheelNav({
    targetRef,
    onPrev,
    onNext,
  });
  return (
    <div ref={targetRef} className="w-full h-full">
      <Calendar
        className={cn(calendarVariants({ variant: 'plain' }), className)}
        date={viewDate}
        events={events}
        view={view}
        startAccessor="startDate"
        endAccessor="endDate"
        localizer={localizer}
        selectable
        onSelectSlot={onSelectSlot}
        onNavigate={onNavigate}
        messages={messages}
        components={components}
      />
    </div>
  );
}
