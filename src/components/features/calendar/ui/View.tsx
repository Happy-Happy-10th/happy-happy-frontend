'use client'
import { useEffect, useRef, useState } from "react";
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
import CalendarEvent from "./DetailEvent";

const calendarVariants = cva(
  `[&_.rbc-row-bg]:!right-[0]
  [&_.rbc-date-cell]:!pr-0
  [&_.rbc-event]:!p-0
  [&_.rbc-today]:!bg-transparent
  [&_.rbc-off-range-bg]:!bg-transparent
  [&_.rbc-date-cell]:!pb-[4px]
  [&_.rbc-event]:!mb-[1px]
  [&_.rbc-event]:!bg-transparent
  [&_.rbc-event-content]:truncate text-[11px]
  [&_.rbc-date-cell]:!flex
  [&_.rbc-date-cell]:!justify-center
  [&_.rbc-month-view]:!rounded-[8px]
  [&_.rbc-month-row]:!min-h-[81.2px]
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
  const { events, isMondayStart, currentDate, handleCurrentDate } = useCalendarContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const cooldown = 500;

  const [isWide, setIsWide] = useState<boolean>(false);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: isMondayStart ? 1 : 0 }),
    getDay,
    locales: { ko },
  });

  useEffect(() => {
    //test
    // const daynow = format(currentDate,"yyyy-MM-dd");
    // alert(daynow);
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < cooldown) return;
      lastScrollTime.current = now;
      e.preventDefault();
      if (e.deltaY > 0) {
        handleCurrentDate(prev => addMonths(prev, 1));
      } else if (e.deltaY < 0) {
        handleCurrentDate(prev => subMonths(prev, 1));
      }
    };

    // ResizeObserver로 width 체크
    const observer = new ResizeObserver(([entry]) => {
      setIsWide(entry.contentRect.width >= 800);
    });
    observer.observe(container);

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    }
  }, [isMondayStart,currentDate]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Calendar
        className={calendarVariants({ variant: 'clearBorder' })}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view="month"
        date={currentDate}
        onNavigate={handleCurrentDate}
        style={{ height: '100%', width : "100%" }}
        popup
        components={{
          event: (eventProps) => isWide
            ? <CalendarEvent {...eventProps.event} />
            : <EventBar {...eventProps.event} />,
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
