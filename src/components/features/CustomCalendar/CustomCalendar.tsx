'use client'
import { useMemo } from "react";
import { useMediaQuery } from "@/hooks";
import { CalendarEventType, SetDateHandler } from "@/@types";
// react-big-calendar
import { Components, SlotInfo, ToolbarProps } from "react-big-calendar";
// base Components
import { 
  CalendarGrid, 
  CalendarToolbar, 
  CalendarMonthHeader, 
  CalendarDateHeader, 
  CalendarEventDetail, 
  CalendarEventMinimal 
} from "@/components/base";

type CustomCalendarPropsType = {
  className?:string;
  viewDate ?: Date;
  events ?: CalendarEventType[];
  isMondayStart?:boolean;
  onChangeViewDate ?: SetDateHandler;
  onSlotSelected ?: (slot: SlotInfo) => void;
}

const NOOP_SET_DATE: SetDateHandler = () => {};

export function CustomCalendar({
  className,
  viewDate = new Date(),
  events = [],
  isMondayStart = true,
  onChangeViewDate = NOOP_SET_DATE,
  onSlotSelected
}:CustomCalendarPropsType){
  //뷰포트 감시
  const BREAKPOINT = '1000px' as const;
  const isWide = useMediaQuery(`(min-width:${BREAKPOINT})`,true)
  // 전달할 커스텀 컴포넌트
  const components = useMemo<Components<CalendarEventType, object>>(
    ()=> makeCustomComponents({isWide,onChangeViewDate}),
    [isWide, onChangeViewDate]);

  return (
    <CalendarGrid
      className={className}
      viewDate={viewDate}
      events={events}
      isMondayStart={isMondayStart}
      onNavigate={onChangeViewDate}
      onSelectSlot={onSlotSelected}
      components={components}
    />
  )
}


type OptionType = { isWide : boolean; onChangeViewDate :SetDateHandler}
function makeCustomComponents({isWide,onChangeViewDate}:OptionType)
:Components<CalendarEventType, object>{
  return{
    toolbar: (p:ToolbarProps<CalendarEventType>)=>(
      <CalendarToolbar 
        {...p}
        onChangeViewDate={onChangeViewDate}
        />
    ),
    month:{
      dateHeader:CalendarDateHeader,
      header:CalendarMonthHeader
    },
    event:(eventProps)=>isWide
      ?<CalendarEventDetail {...eventProps.event} />
      :<CalendarEventMinimal {...eventProps.event} />,
  }
}