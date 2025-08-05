import { Input } from "@/components/ui/input";
import { cn } from "@/utils/tailwind-utils";
import clsx from "clsx";


const itemsStyle = clsx(
  "w-full bg-white rounded-[8px]"
)
type PropsTpye={
  placeholder?:string
  disabled?:boolean
}
export default function EventTextInput({placeholder="",disabled=false}:PropsTpye){
  return(
    <div className={cn(itemsStyle,"relative w-full h-15")}>
      <div className="absolute top-0 bottom-0 left-0 w-[8px] bg-yoteyo-green rounded-l-md" />
        <Input
          placeholder={placeholder}
          className="pl-4 h-15 text-black opacity-100 disabled:opacity-100 disabled:text-black"
          disabled={disabled}
        />
  </div>
  )
}