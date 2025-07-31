import { Calendar, dateFnsLocalizer, DateHeaderProps, HeaderProps, ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths, subMonths, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { cva } from "class-variance-authority";
import { cn } from "@/utils/tailwind-utils";
import { SetDateHandler } from "@/@types";

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
  [&_..rbc-month-row]:!min-h-[30px]
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

type MiniCalendarType = {
  targetDate : Date
  setTargetDate:SetDateHandler
}
export default function MiniCalendar({targetDate,setTargetDate}:MiniCalendarType){
  const isMondayStart = true;
  const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek: () => startOfWeek(targetDate, { weekStartsOn: isMondayStart ? 1 : 0 }),
      getDay,
      locales: { ko },
    });

  return (
    <Calendar
      className={calendarVariants({ variant: 'clearBorder' })}
      startAccessor="start"
      endAccessor="end"
      localizer={localizer}
      view="month"
      style={{ height: '200px', width : "100%" }}
      components={{
        toolbar : Toolbar,
        month:{
          header : MonthHeader,
          dateHeader: (props)=>(<DateHeader {...props} setTargetDate={setTargetDate} targetDate={targetDate}/>)
        }
      }}
    />
  )
}

function Toolbar({date, onNavigate}:ToolbarProps){
  const formatted = format(date, 'yyyy.M');
  const goToBack = () => onNavigate('PREV')
  const goToNext = () => onNavigate('NEXT')
  return (
    <div className="flex justify-between items-center p-2">
      <span className="yoteyo-m-detail-lg">{formatted}</span>
      <div className="flex gap-2">
        <button onClick={goToBack}>◀</button>
        <button onClick={goToNext}>▶</button>
      </div>
    </div>
  )
}

function MonthHeader({ date }: HeaderProps) {
  const day = format(date, 'EEE', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭

  return (
    <div className="text-center font-bold border-none text-yoteyo-gray-300 yoteyo-m-detail-md">
      {day}
    </div>
  );
}
type DateHeaderType = DateHeaderProps &{
  setTargetDate:SetDateHandler
  targetDate:Date
}
function DateHeader({date,isOffRange,targetDate, setTargetDate}:DateHeaderType) {
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  const isToday = isSameDay(date, new Date()); // 오늘 날짜 비교
  const handleSetDate = ()=>{
    const base = new Date(targetDate);
    base.setFullYear(date.getFullYear());
    base.setMonth(date.getMonth());
    base.setDate(date.getDate());
    setTargetDate(base);
  }

  return (
    <div className="flex justify-center items-center" onClick={handleSetDate}>
      <div
        className={cn(
          'm-0 p-o w-[20px] h-[20px] flex justify-center items-center yoteyo-m-body-md',
          day === 0 && 'text-red-500',
          day === 6 && 'text-blue-500',
          isOffRange && 'opacity-50',
          isToday && 'bg-yoteyo-main rounded-full text-white font-normal'
        )}
      >
        {format(date, 'd')}
      </div>
    </div>
  );
}