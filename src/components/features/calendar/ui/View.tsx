'use client'
import { useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

import { useCalendarContext } from "../provider/CalendarContext";
import CalendarToolbar from "./Toolbar";
import CalendarMonthHeader from "./MonthHead";
import CalendarDateHeader from "./DateHeader";
import EventBar from "./EventBar";

const calendarVariants = cva(
  `w-full h-full
  [&_.rbc-row-bg]:!right-[0]
  [&_.rbc-date-cell]:!pr-0
  [&_.rbc-event]:!p-0
  [&_.rbc-today]:!bg-transparent
  [&_.rbc-off-range-bg]:!bg-transparent
  [&_.rbc-date-cell]:!pb-[4px]
  [&_.rbc-event]:!mb-[3px]
  [&_.rbc-event]:!bg-transparent
  [&_.rbc-event-content]:truncate text-[12px]
  [&_.rbc-date-cell]:!flex
  [&_.rbc-date-cell]:!justify-center
  `,{
    variants : {
      variant : {
        clearBorder : `
          [&_.rbc-month-view]:border-none! 
          [&_.rbc-day-bg]:border-none!
          [&_.rbc-header]:border-none!
          [&_.rbc-month-row]:border-none!
          `,
        default : ``
      }
    }
  }
)

export default function CalendarView() {
  const { events, isMondayStart, currentDate, setCurrentDate, calendarHight } = useCalendarContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const cooldown = 500;

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: isMondayStart ? 1 : 0 }),
    getDay,
    locales: { ko },
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < cooldown) return;
      lastScrollTime.current = now;
      e.preventDefault();
      if (e.deltaY > 0) {
        setCurrentDate(prev => addMonths(prev, 1));
      } else if (e.deltaY < 0) {
        setCurrentDate(prev => subMonths(prev, 1));
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMondayStart]);

  return (
    <div ref={containerRef}>
      <Calendar
        className={calendarVariants({ variant: 'clearBorder' })}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view="month"
        date={currentDate}
        onNavigate={setCurrentDate}
        style={{ height: calendarHight }}
        popup
        components={{
          event: (eventProps) => <EventBar {...eventProps.event} />,
          toolbar: CalendarToolbar,
          month: {
            header: CalendarMonthHeader,
            dateHeader: CalendarDateHeader
          }
        }}
      />
    </div>
  );
}