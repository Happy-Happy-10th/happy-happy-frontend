import { CalendarEventType } from "@/@types/calendar";

import DayEventListHead from "./ui/DayEventListHead";
import DayEventBox from "./ui/DayEventBox";
import clsx from "clsx";

const datEvnetListStyle = clsx(
  "rounded-[8px]",
  "w-full h-full",
  "bg-white",
  "flex flex-col"
)

type PropsType = {
  selectedDate : Date,
  dayEvents : CalendarEventType[]
}
export default function DayEventList({selectedDate,dayEvents}:PropsType){
  return(
    <div className={datEvnetListStyle}>
      <DayEventListHead date={selectedDate}/>
      <div className="flex flex-col gap-[10px] w-full overflow-y-auto p-2 flex-1 min-h-0">
        {dayEvents.length===0? 
        <div className="w-full h-full flex justify-center items-center text-yoteyo-m-detail-sm text-yoteyo-gray-300">
          <span>아직 등록된 일정이 없습니다</span>
        </div> :
        dayEvents.map((event)=>(
          <DayEventBox event={event}/>
        )) }
      </div>
    </div>
  )
}