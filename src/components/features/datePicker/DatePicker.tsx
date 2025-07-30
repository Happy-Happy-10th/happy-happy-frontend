import { useState } from "react"
import clsx from "clsx"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import SetDate from "./ui/SetDate"

const datePickerFrame = clsx(
  " ml-5 mr-5 mt-2"
)
const datePickerbody = clsx(
  "w-full flex flex-row justify-between items-center mt-2 mb-2",
)

type PropsType = {}
export default function DatePicker({}:PropsType){
  const [startDate,setSartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [switchCheck,setSwitchCheck]  = useState(false); 
  return(
    <div className={datePickerFrame}>
      <div className={datePickerbody}>
        <Label htmlFor="all-day-switch" className="yoteyo-m-detail-lg">하루종일</Label>
        <Switch 
          id="all-day-switch" 
          className="w-[56px] h-[32px] data-[state=checked]:bg-yoteyo-main"
          thumbClassName="size-7 data-[state=checked]:translate-x-[calc(100%-3px)]"
          onCheckedChange={(checked)=>setSwitchCheck(checked)}
        />
      </div>
      <Separator className="my-1"/>
      <div className={datePickerbody}>
        <SetDate targetDateName="시작" targetDateValue={startDate} allDayChecked={switchCheck}/>
      </div>
      <Separator className="my-1"/>
      <div className={datePickerbody}>
        <SetDate targetDateName="종료" targetDateValue={endDate} allDayChecked={switchCheck}/>
      </div>
    </div>
  )
}