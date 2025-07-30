import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/tailwind-utils";

const dateBox = clsx(
  "flex justify-center items-center",
  "bg-yoteyo-gray-100 font-yoteyo-p-body-lg rounded-md",
  "hover:cursor-pointer hover:text-yoteyo-main",
  "w-[107px] h-9 xl:h-8"
)

type PropsType = {
  targetDateName : string;
  targetDateValue : Date;
  allDayChecked : boolean;
}
type AccodianType ="date-pick"|"time-pick"|null;
export default function SetDate({targetDateName, targetDateValue, allDayChecked}:PropsType){

  const [accodianType, setAccodianType] = useState<AccodianType>(null);
  const handleAccodian = (inputAccodianType:AccodianType)=>{
    setAccodianType((prev) => (prev === inputAccodianType ? null : inputAccodianType));
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between">
        <span className="yoteyo-m-detail-lg">{targetDateName}</span>
        <div className="flex flex-row gap-1">
          <Button 
            className={cn(dateBox,accodianType==="date-pick"&&"text-yoteyo-main")}
            variant={"ghost"}
            value={"date-pick"}
            onClick={() => handleAccodian("date-pick")}
            >
            {format(targetDateValue,"yyyy.MM.dd")}
          </Button>
          {allDayChecked && 
            <Button 
              className={cn(dateBox,accodianType==="time-pick"&&"text-yoteyo-main")}
              variant={"ghost"}
              value={"time-pick"}
              onClick={() => handleAccodian("time-pick")}
            >
              {format(targetDateValue,"a hh:mm",{locale: ko})}
            </Button>}
        </div>
      </div>
      <AnimatePresence>
        {accodianType &&(
          <motion.div 
            className="w-full h-[200px]" 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            >
            <Separator className="my-1"/>
            <div className="w-full bg-yoteyo-main">
              {accodianType === "date-pick" && <DatePcik/>}
              {accodianType === "time-pick" && <TimePick/>}
            </div>
          </motion.div> )}
      </AnimatePresence>
    </div>
  )
}

function DatePcik(){
  return <span>요일 선택 캘린더 등장</span>
}

function TimePick(){
  return <span>시간선택 등장</span>
}