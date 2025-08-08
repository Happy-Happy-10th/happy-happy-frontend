"use client"
import { useState } from "react"
import clsx from "clsx"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useDateState } from "@/hooks"
import SetDate from "./ui/SetDate"
import { useFormContext } from "react-hook-form"

const dateSelectorFrame = clsx(
  "pt-2 pb-2 pl-5 pr-5"
)
const dateSelectorbody = clsx(
  "w-full flex flex-row justify-between items-center mt-2 mb-2",
)

/**
 * 캘린더랑 시간을 선택하는 아코디언이 닫히는 시점 및 UI요소가 필요
 */
type PropsType = {}
export default function DateSelector({}:PropsType){
  const { watch, setValue } = useFormContext();
  const allDay = watch("allDay");
  const handleAllDayChange = (checked: boolean) => {
    setValue("allDay", checked);
  };
  const start = watch("startDate");
  const handleStartChange = (date: Date) => {
    setValue("startDate", date);
  };
  const end = watch("endDate");
  const handleEndChange = (date: Date) => {
    setValue("endDate", date);
  };
  
  return(
    <div className={dateSelectorFrame}>
      <div className={dateSelectorbody}>
        <Label htmlFor="all-day-switch" className="yoteyo-m-detail-lg">하루종일</Label>
        <Switch 
          id="all-day-switch" 
          className="w-[56px] h-[32px] data-[state=checked]:bg-yoteyo-main"
          thumbClassName="size-7 data-[state=checked]:translate-x-[calc(100%-3px)]"
          onCheckedChange={handleAllDayChange}
          checked={allDay}
          defaultChecked
        />
      </div>
      <Separator className="my-1"/>
      <div className={dateSelectorbody}>
        <SetDate 
          targetDateName="시작" 
          targetDateValue={start} 
          targetDateSetFn={handleStartChange}
          allDayChecked={allDay}
          />
      </div>
      <Separator className="my-1"/>
      <div className={dateSelectorbody}>
        <SetDate 
          targetDateName="종료" 
          targetDateValue={end}
          targetDateSetFn={handleEndChange} 
          allDayChecked={allDay}
          />
      </div>
    </div>
  )
}