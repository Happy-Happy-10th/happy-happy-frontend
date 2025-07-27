import clsx from "clsx"
import { cva } from "class-variance-authority";
import { CalendarEventType } from "@/@types/calendar";
import { cn } from "@/utils/tailwind-utils";
import { convertEventDateToString } from "@/utils/calendar/dateConverter";

const eventChildVariants = cva(
  `pl-[5px] w-[2px] h-full rounded-[8px]`, {
  variants: {
    variant: {
      type1: "bg-event-type1",
      type2: "bg-event-type2",
      type3: "bg-event-type3",
      type4: "bg-event-type4",
      default : `bg-main`,
    },
  },
});

const eventBox=clsx(
  "border-1 border-solid rounded-[8px] border-[#EAEAEA]",
  "w-[260px] h-[64px]",
  "flex flex-row"
);

const eventContents =clsx(
  "flex flex-col justify-center",
  "pl-[11px]"
)

type PropsType = {
  event : CalendarEventType
}
export default function DayEventBox({event}:PropsType){
  const viewEvent = convertEventDateToString(event);
  return(
    <div className={eventBox}>
      <div className={cn(eventChildVariants({variant:event.colorType}))}></div>
      <div className={eventContents}>
        <div className="font-bold">{viewEvent.title}</div>
        <div>{`${viewEvent.start} ~ ${viewEvent.end}`}</div>
      </div>
    </div>
  )
}