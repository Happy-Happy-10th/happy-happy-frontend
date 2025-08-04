import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "@/components/ui/select"

  import { cn } from "@/utils/tailwind-utils"
  import clsx from "clsx"

const selectStyle = clsx(
  "flex justify-center items-center",
  "w-19 h-9 border-1 border-soild rounded-[8px]"
)

type CustomSelectType = {
  selectItems : string[]
  onChangedFn: (value:string)=>void
  className:string;
}
export default function CustomSelect({selectItems, onChangedFn, className}:CustomSelectType){
  return (
    <Select onValueChange={(value)=>onChangedFn(value)} defaultValue={selectItems[0]}>
        <SelectTrigger className={cn(selectStyle,className)} >
          <SelectValue placeholder={selectItems[0]} />
        </SelectTrigger>
        <SelectContent 
          className={cn(
            "w-full min-w-0 h-35 overflow-auto",
            "[&_[data-slot=select-scroll-down-button]]:hidden",
            "[&_[data-slot=select-scroll-up-button]]:hidden"
          )}>
          <SelectGroup>
            {selectItems.map((item)=>(
              <SelectItem value={item} key={`selectItems_${item}`}>
                {item}
              </SelectItem>  
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}