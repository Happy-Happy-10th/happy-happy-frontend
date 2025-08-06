import { cn } from "@/utils/tailwind-utils";
import {Text} from "@/components/base"
import { calendarEvents } from "@/@mock/calendar";
import { FeedEventList } from "../features";

export default function FeedPage(){
  // const todayevent = calendarEvents;
  return(
    <div className={cn("xl:h-full w-hull flex xl:flex-row flex-col gap-5 xl:p-7.5 p-5 bg-yoteyo-gray-100 h-full overflow-scroll")}>
      <div className="flex flex-col xl:gap-5 gap-3">
        {/* 웰컴 문구 */}
        <div className="xl:w-123 w-full xl:h-17 h-20 bg-yoteyo-main rounded-t-[8px] rounded-r-[8px] flex shrink-0 items-center justify-center pl-5">
          <Text className="text-white" variant={"body1"}>요때요 맞춤 오늘의 특별한 일정을 지금 바로 확인해보세요!</Text>
        </div>
        {/* 오늘 일정 부분 */}
        <div className="xl:w-177 xl:h-[calc(100vh-180px)] w-full h-150 xl:p-6 p-5 bg-white rounded-[8px] flex flex-col justify-between">
          <Text variant={"title2"}>오늘 일정</Text>
          <div className="w-full flex-1 min-h-0 overflow-auto">
            <div className="w-full">
              {/* 일정 배열 받으면 보여줄 컴포넌트 추가 */}
              <div className="w-full">
                <FeedEventList events={calendarEvents}/>
              </div>
            </div>
            <div className="w-full h-12 flex justify-center items-center border-1 border-yoteyo-outline rounded-[8px] mt-4">
              <Text variant={"body3"}>오늘 일정 더 보기</Text>
            </div>
          </div>
        </div>
      </div>
      {/* 다가오는 일정 리스트 */}
      <div className="xl:w-123 h-150 w-full bg-white rounded-[8px] p-6">
        <div className="flex flex-row justify-between items-center">
          <Text variant={"title2"}>다가오는 일정</Text>
          <div className="w-22 h-7 flex justify-center items-center rounded-[8px] border-1 border-yoteyo-outline">
            <Text variant={"body3"}>전체보기</Text>
          </div>
        </div>
          <div className="flex w-full xl:xl:h-[calc(100vh-180px)] h-full xl:mt-5 mt-3">
            <div className="w-full flex-1 min-h-0 overflow-auto">
              <FeedEventList events={calendarEvents}/>
            </div>
          </div>
      </div>
    </div>
  )
}