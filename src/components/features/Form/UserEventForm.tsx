"use client"
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { cn } from "@/utils/tailwind-utils";

import { Input } from "@/components/ui/input";

import { ColorPicker, RepeatPicker } from "@/components/base";
import { DateSelector } from "../dateSelector";
import TextArea from "@/components/base/TextArea/TextArea";


const itemsStyle = clsx(
  "w-full bg-white rounded-[8px]"
)

type PropsType = {}
export default function UserEventForm({}:PropsType){
    //크기가 커질때마다 스크롤을 같이 내리기
    const [scrollLocateText, setScrollLocateText] = useState("");
    const [scrollMemoText,setScrollMemoText] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);
  
    useEffect(()=>{
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      
      if(scrollContainerRef.current){
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    },[scrollLocateText, scrollMemoText])
  return(
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide pb-9">
        <div className="w-full p-5 flex flex-col gap-5">
          {/* 일정 타이틀 입력 */}
          <div className={cn(itemsStyle,"relative w-full h-15")}>
            <div className="absolute top-0 bottom-0 left-0 w-[8px] bg-yoteyo-green rounded-l-md" />
              <Input
                placeholder="일정을 입력하세요"
                className="pl-4 h-15"
              />
          </div>
          {/* 일정 날짜 시간 선택 */}
          <div className={itemsStyle}>
            <DateSelector/>
          </div>
          {/* 일정 반복 선택 */}
          <div className={itemsStyle}>
            <RepeatPicker />
          </div>
          {/* 이벤트 색상 선택 */}
          <div className={itemsStyle}>
            <ColorPicker/>
          </div>
          {/* 위치 및 메모 */}
          <div className={itemsStyle}>
            <div className="flex flex-col">
              <TextArea 
                className="border-none yoteyo-m-detail-lg rounded-b-none"
                rows={10}
                placeholder="위치"
                value={scrollLocateText}
                onChange={(e) => setScrollLocateText(e.target.value)}
              />
              {/* <Separator/> */}
              <TextArea
                className="border-none yoteyo-m-detail-lg rounded-t-none" 
                placeholder="메모"
                value={scrollMemoText}
                onChange={(e) => setScrollMemoText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
  )
}