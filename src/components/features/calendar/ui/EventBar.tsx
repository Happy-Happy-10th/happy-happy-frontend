import { CalendarEventType } from "@/@types/calendar";
import { cn } from "@/utils/tailwind-utils";
import { cva } from "class-variance-authority";


const evnetBarVariants = cva(
  `w-full h-[6px] rounded-[2px]`,{
  variants:{
    variant:{
      type1 : `bg-event-type1`,
      type2 : `bg-event-type2`,
      type3: `bg-event-type3`,
      type4 : `bg-event-type4`,
      default : `bg-main`,
    }
  }
})

export default function EventBar({
  start,
  end,
  title,
  color,
  colorType,
  stage,
  allDay
}: CalendarEventType){
  return (
    <div className={cn(evnetBarVariants({variant:colorType}))}></div>
  )
}