import clsx from "clsx"
import { cva } from "class-variance-authority";
import { CalendarEventType } from "@/@types/calendar";
import { cn } from "@/utils/tailwind-utils";
import { convertEventDateToString } from "@/utils/calendar/dateConverter";

const eventChildVariants = cva(
  `pl-[5px] w-[2px] h-full rounded-[8px]`, {
  variants: {
    variant: {
      yoteyoRed: "bg-yoteyo-red",
      yoteyoOrange: "bg-yoteyo-orange",
      yoteyoYellow: "bg-yoteyo-yellow",
      yoteyoGreen: "bg-yoteyo-green",
      yoteyoEmerald : `bg-yoteyo-emerald`,
      yoteyoSky : `bg-yoteyo-sky`,
      yoteyoBlue : `bg-yoteyo-blue`,
      yoteyoPurple : `bg-yoteyo-purple`,
      yoteyoPink : `bg-yoteyo-pink`,
      yoteyoBlack : `bg-yoteyo-black`,
      default : 'bg-yoteyo-main'
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