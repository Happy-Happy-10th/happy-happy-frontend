"use client"
import { useState } from "react"
import clsx from "clsx"
import { cn } from "@/utils/tailwind-utils"

const repeatPickerFrame = clsx(
  "w-full h-27 pt-5 pb-5 pl-4 pr-4",
  "yoteyo-m-title-main-sm"
)

const buttonStyle = clsx(
  "w-12 h-8 yoteyo-m-body-lg",
  "border-1 border-soild border-yoteyo-gray-100 rounded-[8px]",
  "flex justify-center items-center",
  "hover:cursor-pointer"
)

type PropsType = {}
type SelectedType = "day"|"week"|"month"|"year"|null;
export default function RepeatPicker({}:PropsType){
  const [selected, setSelected] = useState<SelectedType>(null);
  const handleSelected = (nowSelected:SelectedType)=>{
    setSelected((prev)=>prev===nowSelected?null:nowSelected);
  }
  return(
    <div className={repeatPickerFrame}>
      <span>일정 반복</span>
      <div className="flex flex-row gap-4 mt-[18px]">
        <div 
          className={cn(buttonStyle,selected==='day'&& "bg-yoteyo-main text-white")}
          onClick={()=>handleSelected("day")}
          >
            일
        </div>
        
        <div 
          className={cn(buttonStyle,selected==='week'&& "bg-yoteyo-main text-white")}
          onClick={()=>handleSelected("week")}
          >
            주
        </div>

        <div 
          className={cn(buttonStyle,selected==='month'&& "bg-yoteyo-main text-white")}
          onClick={()=>handleSelected("month")}
          >
            월
        </div>
        <div 
          className={cn(buttonStyle,selected==='year'&& "bg-yoteyo-main text-white")}
          onClick={()=>handleSelected("year")}
          >
            년
        </div>
      </div>
    </div>
  )
}