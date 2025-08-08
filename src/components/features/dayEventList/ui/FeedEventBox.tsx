"use client"
import { cn } from "@/utils/tailwind-utils";
import {Button, MiniCalendarIcon, MiniClockIcon, RadioOffIcon, RadioOnIcon, Text} from '@/components/base'
import { CalendarEventType } from "@/@types/calendar";
import { convertEventDateToString } from "@/utils";
import { useState } from "react";

type PropsType ={
  event : CalendarEventType
}
export default function FeedEventBox({event}:PropsType){
  const [radioSelected, setRadioSelectred] = useState<boolean>(false);
  const handleRadioClick = ()=>{
    setRadioSelectred((prev)=>!prev);
  }

  const stringEvent = convertEventDateToString(event);
  const startDateAndTime = stringEvent.startDate.split('T');
  const endDateAndTime = stringEvent.endDate.split('T');
  return(
    <div className={cn("w-full h-27 flex flex-row p-4 justify-between border-1 border-yoteyo-outline rounded-[8px]")}>
      {/* 일정 */}
      <div className="flex flex-col justify-start">
        {/* 일정 타이틀 */}
        <Text className={radioSelected?"text-yoteyo-gray-200":"text-yoteyo-black"} variant={"body2"}>
          {stringEvent.title}
        </Text>
        {/* 일정 시작 종료 날짜 */}
        <div className="flex flex-row items-center gap-1">
          <MiniCalendarIcon className={radioSelected?"text-yoteyo-gray-200":"text-yoteyo-main"}/>
          <Text className={radioSelected?"text-yoteyo-gray-200":"text-yoteyo-black"} variant={"body3"}>
            {`${startDateAndTime[0]} ~ ${endDateAndTime[0]}`}
          </Text>
        </div>
        {/* 일정 시작 종료 시간 */}
        <div className="flex flex-row items-center gap-1">
          <MiniClockIcon className={radioSelected?"text-yoteyo-gray-200":"text-yoteyo-main"}/>
          <Text className={radioSelected?"text-yoteyo-gray-200":"text-yoteyo-black"} variant={"body3"}>
            {`${startDateAndTime[1]} ~ ${endDateAndTime[1]}`}
          </Text>
        </div>
      </div>
      {/* 라디오 */}
      <div className="flex items-center">
        {radioSelected?(
          <Button type="button" variant={"icon"} size={"icon"} onClick={handleRadioClick}>
            <RadioOnIcon className="size-6"/>
          </Button>
          ):(
          <Button type="button" variant={"icon"} size={"icon"} onClick={handleRadioClick}>
            <RadioOffIcon className="size-6"/>
          </Button>
          )}
      </div>
    </div>
  )
}