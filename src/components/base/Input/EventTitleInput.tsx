import { EventColor } from "@/@types/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/tailwind-utils";
import { cva } from "class-variance-authority";
import clsx from "clsx";


const itemsStyle = clsx(
  "w-full bg-white rounded-[8px]"
)

const eventChildVariants = cva(
  `absolute top-0 bottom-0 left-0 w-[8px] rounded-l-md`, {
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

type PropsTpye={
  placeholder?:string
  disabled?:boolean
  color?:EventColor
}
export default function EventTextInput({placeholder="",disabled=false,color="yoteyoGreen"}:PropsTpye){
  return(
    <div className={cn(itemsStyle,"relative w-full h-15")}>
      <div className={cn(eventChildVariants({variant:color}))}></div>
        <Input
          placeholder={placeholder}
          className="pl-4 h-15 text-black opacity-100 disabled:opacity-100 disabled:text-black"
          disabled={disabled}
        />
  </div>
  )
}
