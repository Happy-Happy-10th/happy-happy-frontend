import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { cn } from "@/utils/tailwind-utils";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


import { SetDateHandler } from "@/@types";
import { DatePicker, TimePicker } from "@/components/base";



const dateBox = clsx(
  "flex justify-center items-center",
  "bg-yoteyo-gray-100 font-yoteyo-p-body-lg rounded-md",
  "hover:cursor-pointer hover:text-yoteyo-main",
  "w-[107px] h-9 xl:h-8"
)

type PropsType = {
  targetDateName : string;
  targetDateValue : Date;
  targetDateSetFn : SetDateHandler;
  allDayChecked : boolean;
}
type AccodianType ="date-pick"|"time-pick"|null;
export default function SetDate({targetDateName, targetDateValue, allDayChecked, targetDateSetFn}:PropsType){
  //아코디언 State
  const [accodianType, setAccodianType] = useState<AccodianType>(null);
  const handleAccodian = (inputAccodianType:AccodianType)=>{
    setAccodianType((prev) => (prev === inputAccodianType ? null : inputAccodianType));
  }
  useEffect(()=>{
    console.log(format(targetDateValue,'yyyy-MM-dd-HH-mm'))
    // handleAccodian(null);
  },[targetDateValue])
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
          {allDayChecked || 
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
            <div className="w-full">
              {accodianType === "date-pick" && 
                <DatePicker targetDate={targetDateValue} setTargetDate={targetDateSetFn}/>}
              {accodianType === "time-pick" && 
                <TimePicker targetDate={targetDateValue} setTargetDate={targetDateSetFn}/>}
            </div>
          </motion.div> )}
      </AnimatePresence>
    </div>
  )
}