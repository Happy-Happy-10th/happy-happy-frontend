import { CalendarEventType } from "@/@types/calendar";
import { cn } from "@/utils/tailwind-utils";
import { cva } from "class-variance-authority";

const evnetBarVariants = cva(
  `w-full h-full flex flex-row justify-between rounded-[4px] text-[11px] overflow-hidden`,{
    variants:{
      variant:{
        type1 : `bg-event-type1-sub text-event-type1`,
        type2 : `bg-event-type2-sub text-event-type2`,
        type3 : `bg-event-type3-sub text-event-type3`,
        type4 : `bg-event-type4-sub text-event-type4`,
        default : `bg-main text-[white]`,
      }
    }
  }
)

const eventChildVariants = cva(
  `pl-[5px] w-[2px] h-[16.5px] rounded-[4px]`, {
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

export default function CalendarEvent({
  start,
  end,
  title,
  color,
  colorType,
  stage,
  allDay
}: CalendarEventType) {
  return (
    <div className={cn(evnetBarVariants({variant:colorType}))}>
      <div className={cn(eventChildVariants({variant:colorType}))}></div>
      <div className="w-[95%] flex justify-center">{title}</div>
    </div>
  );
}
