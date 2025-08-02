import { useState } from "react"
import clsx from "clsx"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import SetDate from "./ui/SetDate"
import { useDateState } from "@/hooks"

const datePickerFrame = clsx(
  "pt-2 pb-2 pl-5 pr-5"
)
const datePickerbody = clsx(
  "w-full flex flex-row justify-between items-center mt-2 mb-2",
)

/**
 * 캘린더랑 시간을 선택하는 아코디언이 닫히는 시점 및 UI요소가 필요
 */
type PropsType = {}
export default function DatePicker({}:PropsType){
  const [startDate,setSartDate] = useDateState();
  const [endDate, setEndDate] = useDateState();

  const [switchCheck,setSwitchCheck]  = useState(true); 
  return(
    <div className={datePickerFrame}>
      <div className={datePickerbody}>
        <Label htmlFor="all-day-switch" className="yoteyo-m-detail-lg">하루종일</Label>
        <Switch 
          id="all-day-switch" 
          className="w-[56px] h-[32px] data-[state=checked]:bg-yoteyo-main"
          thumbClassName="size-7 data-[state=checked]:translate-x-[calc(100%-3px)]"
          onCheckedChange={(checked)=>setSwitchCheck(checked)}
          defaultChecked
        />
      </div>
      <Separator className="my-1"/>
      <div className={datePickerbody}>
        <SetDate 
          targetDateName="시작" 
          targetDateValue={startDate} 
          targetDateSetFn={setSartDate}
          allDayChecked={switchCheck}/>
      </div>
      <Separator className="my-1"/>
      <div className={datePickerbody}>
        <SetDate 
          targetDateName="종료" 
          targetDateValue={endDate}
          targetDateSetFn={setEndDate} 
          allDayChecked={switchCheck}/>
      </div>
    </div>
  )
}