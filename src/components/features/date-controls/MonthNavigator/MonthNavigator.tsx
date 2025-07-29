"use client"
import clsx from "clsx";
import { subYears, addYears } from "date-fns";

import MonthNavigaotrHead from "./ui/MonthNavigaotrHead";
import MonthNavigatorBody from "./ui/MonthNavigatorBody";

const MonthNavigatorFrame = clsx(
  "w-[230px] h-[230px]",
  "ml-[16px] mr-[16px]",
)
type PropsType = {
  currentDate : Date,
  handleCurrentDate : (updater:Date| ((prev: Date)=>Date)) => void
}
/**
 * @currentDate @handleCurrentDate 둘다 외부의 State와 State를 변경하는 핸들러 함수에 의존
 */
export default function MonthNavigator({currentDate,handleCurrentDate}:PropsType){
  const handlePrevYear = () => handleCurrentDate((prev) => subYears(prev, 1));
  const handleNextYear = () => handleCurrentDate((prev) => addYears(prev, 1));
  return (
    <div className={MonthNavigatorFrame}>
      <MonthNavigaotrHead currentDate={currentDate} onPrevYear={handlePrevYear} onNextYear={handleNextYear}/>
      <MonthNavigatorBody currentDate={currentDate} handleCurrentDate={handleCurrentDate}/>
    </div>
  )
}