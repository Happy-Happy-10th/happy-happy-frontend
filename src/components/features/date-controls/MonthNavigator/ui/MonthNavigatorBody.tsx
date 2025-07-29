import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { setMonth } from "date-fns";

const monthFrame = clsx(
  "w-full flex-1 min-h-[190px]",
  "flex flex-row flex-wrap gap-[11px] justify-center items-center",
  "pt-[11px] pb-[19px]",
)
type PropsType = {
  currentDate:Date;
  handleCurrentDate:(newDate:Date)=>void
}
export default function MonthNavigatorBody({currentDate, handleCurrentDate}:PropsType){
  const Month = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const handleClickMonth = (MonthIndex:number)=>{
    const newDate = setMonth(currentDate,MonthIndex);
    handleCurrentDate(newDate);
  }
  return (
    <div className={monthFrame}>
      {Month.map((month,index)=>(
        <Button 
          className="w-[58px] h-[32px]" 
          type="button" 
          variant={"outline"} 
          onClick={()=>handleClickMonth(index)}>
          <div>{month}</div>
        </Button>
      ))}
    </div>
  )
}