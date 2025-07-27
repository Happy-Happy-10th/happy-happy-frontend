import { CalendarEventType } from "@/@types/calendar";

import DayEventListHead from "./ui/DayEventListHead";
import DayEventBox from "./ui/DayEventBox";
import clsx from "clsx";

const datEvnetListStyle = clsx(
  "mt-[74px] mr-[30px] p-[24px]",
  "bg-white rounded-[8px]"
)

type PropsType = {
  selectedDate : Date,
  dayEvents : CalendarEventType[]
}
export default function DayEventList({selectedDate,dayEvents}:PropsType){
  return(
    <div className={datEvnetListStyle}>
      <DayEventListHead date={selectedDate}/>
      <div className="flex flex-col gap-[10px]">
        {dayEvents.map((event)=>(
          <DayEventBox event={event}/>
        ))}
      </div>
    </div>
  )
}