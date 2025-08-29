"use client"
import { CalendarEventType } from "@/@types/calendar"
import {Button, Text} from "@/components/base"
import FeedEventBox from "./ui/FeedEventBox"
import { getEventsByDay, getUpcomingEvents } from "@/utils";
import { useEffect, useState } from "react";
import { cn } from "@/utils/tailwind-utils";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api";
import { calendarService } from "@/api/service/calendar";
import { extractYear } from "@/utils/calendar/extractDate";
import { useStore } from "zustand";
import { useAuthStore } from "@/store";

type PropsType = {
  noneEventMessage : string;
  viewTargetEvent : string;
}
export default function FeedEventList({noneEventMessage, viewTargetEvent}:PropsType){
  const today = new Date();
  const year = extractYear(today);
  const { user } = useStore(useAuthStore);
  
  const {data}= useQuery({
    queryKey : queryKeys.calendar.events(year).queryKey,
    queryFn : ()=> calendarService.getEvents(year, user!.calendarId),
    enabled: !!user?.calendarId,
  })

  const [isClicked, setIsClicked] = useState(false);
  const [events,setEvents] = useState<CalendarEventType[]>([]);

  const handleMoreEvents = ()=>{
    viewTargetEvent === 'today'&&setEvents(getEventsByDay(data||[]));
    setIsClicked(true);
  }
  useEffect(()=>{
    if(data||[].length<5) setIsClicked(true)

    if(viewTargetEvent === 'today'){
      setEvents(getEventsByDay(data||[]))
    }
    if(viewTargetEvent === 'upcomming'){
      setEvents(getUpcomingEvents(data||[],5))
    }
  },[])
  
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {events.length===0?(
      <div className="flex w-full h-full justify-center items-center">
        <Text className="text-yoteyo-gray-200" variant={"body1"}>
          {noneEventMessage}
        </Text>
      </div>
    ):(
      events.map((event,index)=>(
        <FeedEventBox
          key={`feedEvent${index}`}
          event={event}
        />
      ))
    )}
    {viewTargetEvent==='today' &&(
      <Button 
        type="button" 
        variant={"outline"}
        onClick={handleMoreEvents} 
        className={cn(
          "w-full h-12 flex justify-center items-center border-1 border-yoteyo-outline rounded-[8px] mt-4 text-black",
          isClicked && "text-yoteyo-outline border-yoteyo-outline"
        )}>
        <Text variant={"body3"}>
          {viewTargetEvent==='today'?"오늘 일정 더 보기":"전체 보기"}
        </Text>
      </Button>
      )}
    </div>
  )
}