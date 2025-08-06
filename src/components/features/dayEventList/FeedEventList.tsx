import { CalendarEventType } from "@/@types/calendar"
import {Text} from "@/components/base"
import FeedEventBox from "./ui/FeedEventBox"

type PropsType = {
  events: CalendarEventType[]
}
export default function FeedEventList({events}:PropsType){
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {events.length===0?(
      <div className="flex w-full h-full justify-center items-center">
        <Text className="text-yoteyo-gray-200" variant={"body1"}>
          등록된 오늘 일정이 없습니다.
        </Text>
      </div>
    ):(
      events.map((event)=>(
        <FeedEventBox
          key={`feedEvent${event.title}`}
          event={event}
        />
      ))
    )}
    </div>
  )
}