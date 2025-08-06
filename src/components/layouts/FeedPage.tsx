import { cn } from "@/utils/tailwind-utils";
import {Text} from "@/components/base"
import { calendarEvents } from "@/@mock/calendar";
import { FeedEventList } from "../features";

export default function FeedPage(){
  // const todayevent = calendarEvents;
  return(
    <div className={cn("h-full w-hull flex xl:flex-row flex-col gap-5 p-7.5 bg-yoteyo-gray-100")}>
      {/* 오늘 일정 부분 */}
      <div className="flex flex-col gap-5">
        {/* 웰컴 문구 */}
        <div className="xl:w-123 w-full xl:h-17 h-20 bg-yoteyo-main rounded-t-[8px] rounded-r-[8px] flex items-center justify-center sm:pl-5">
          <Text className="text-white" variant={"body1"}>요때요 맞춤 오늘의 특별한 일정을 지금 바로 확인해보세요!</Text>
        </div>

        <div className="xl:w-177 xl:h-full w-full h-150 p-6 bg-white rounded-[8px] flex flex-col justify-between">
          <Text variant={"title2"}>오늘 일정</Text>
          <div className="w-full h-full">
            {/* 일정 배열 받으면 보여줄 컴포넌트 추가 */}
            <div className="w-full h-full">
              <FeedEventList events={calendarEvents}/>
            </div>
          </div>
          <div className="w-full h-12 flex justify-center items-center border-1 border-yoteyo-outline rounded-[8px]">
            <Text variant={"body3"}>오늘 일정 더 보기</Text>
          </div>
        </div>
      </div>
      {/* 다가오는 일정 리스트 */}
      <div className="xl:w-123 w-full flex-1 bg-white rounded-[8px] p-6">
        <div className="flex flex-row justify-between items-center">
          <Text variant={"title2"}>다가오는 일정</Text>
          <div className="w-22 h-7 flex justify-center items-center rounded-[8px] border-1 border-yoteyo-outline">
            <Text variant={"body3"}>전체보기</Text>
          </div>
        </div>
        <div>hi</div>
      </div>
    </div>
  )
}