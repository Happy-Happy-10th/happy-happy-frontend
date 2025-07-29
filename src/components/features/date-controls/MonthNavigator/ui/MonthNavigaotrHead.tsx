import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

const headerFrame = clsx(
  "w-[230px] h-[40px] flex flex-row justify-between rounded-[8px] items-center",
)
const yearText = clsx(
  "text-xl font-semibold"
)
type PropsType ={
  currentDate : Date
  onPrevYear : ()=>void
  onNextYear : ()=>void
}
export default function MonthNavigaotrHead({currentDate, onPrevYear, onNextYear}:PropsType){
  const year = format(currentDate, "yyyy");
  return (
    <div className={headerFrame}>
      <Button type="button" variant={"ghost"} onClick={onPrevYear}>
        <ChevronLeft size={24}/>
      </Button>
      <h4 className={yearText}>{year}</h4>
      <Button type="button" variant={"ghost"} onClick={onNextYear}>
        <ChevronRight size={24}/>
      </Button>
    </div>
  )
}