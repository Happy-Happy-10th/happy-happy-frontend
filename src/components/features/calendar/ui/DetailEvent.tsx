import { CalendarEventType } from "@/@types/calendar";
import { cn } from "@/utils/tailwind-utils";
import { cva } from "class-variance-authority";

const evnetBarVariants = cva(
  `w-full h-full flex flex-row justify-between rounded-[4px] text-[11px] overflow-hidden select-none opacity-100`,{
    variants:{
      variant:{
        yoteyoRed: "bg-yoteyo-red",
        yoteyoOrange: "bg-yoteyo-orange",
        yoteyoYellow: "bg-yoteyo-yellow",
        yoteyoGreen: "bg-yoteyo-green",
        yoteyoEmerald: "bg-yoteyo-emerald",
        yoteyoSky: "bg-yoteyo-sky",
        yoteyoBlue: "bg-yoteyo-blue",
        yoteyoPurple: "bg-yoteyo-purple",
        yoteyoPink: "bg-yoteyo-pink",
        yoteyoBlack: "bg-yoteyo-black",
        default : `bg-yoteyo-main`,
      }
    }
  }
)

const eventChildVariants = cva(
  `pl-[5px] w-[2px] h-[16.5px] rounded-[4px]`, {
  variants: {
    variant: {
      yoteyoRed: "bg-yoteyo-red",
      yoteyoOrange: "bg-yoteyo-orange",
      yoteyoYellow: "bg-yoteyo-yellow",
      yoteyoGreen: "bg-yoteyo-green",
      yoteyoEmerald: "bg-yoteyo-emerald",
      yoteyoSky: "bg-yoteyo-sky",
      yoteyoBlue: "bg-yoteyo-blue",
      yoteyoPurple: "bg-yoteyo-purple",
      yoteyoPink: "bg-yoteyo-pink",
      yoteyoBlack: "bg-yoteyo-black",
      default : `bg-yoteyo-main`,
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
