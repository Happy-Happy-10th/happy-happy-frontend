"use client"
import clsx from "clsx";

import MonthNavigaotrHead from "./ui/MonthNavigaotrHead";
import MonthNavigatorBody from "./ui/MonthNavigatorBody";

const MonthNavigatorFrame = clsx(
  "w-[230px] h-[230px]",
  "ml-[16px] mr-[16px]",
)

type PropsType = {
  currentDate : Date,
  handleCurrentDate : (newDate:Date)=>void
  onPrevYear : ()=>void,
  onNextYear : ()=>void
}
export default function MonthNavigator({currentDate,handleCurrentDate, onPrevYear, onNextYear}:PropsType){

  return (
    <div className={MonthNavigatorFrame}>
      <MonthNavigaotrHead currentDate={currentDate} onPrevYear={onPrevYear} onNextYear={onNextYear}/>
      <MonthNavigatorBody currentDate={currentDate} handleCurrentDate={handleCurrentDate}/>
    </div>
  )
}