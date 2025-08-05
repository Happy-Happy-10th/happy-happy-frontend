import { cn } from "@/utils/tailwind-utils"
import clsx from "clsx"
import { Button, EventTextInput } from "../base"
import { CalendarEventType } from "@/@types/calendar"
import { Separator } from "@radix-ui/react-select"
import { ko } from "date-fns/locale"
import { format } from "date-fns"
import TextArea from "../base/TextArea/TextArea"

const itemsStyle = clsx(
  "w-full bg-white rounded-[8px]"
)
const dateBox = clsx(
  "flex justify-center items-center",
  "bg-yoteyo-gray-100 font-yoteyo-p-body-lg rounded-md",
  "hover:cursor-pointer hover:text-yoteyo-main",
  "w-[107px] h-9 xl:h-8"
)

type PropsType = {
  event : CalendarEventType
  onEdit ?: ()=>void
}
export default function UserEventCheck({event,onEdit}:PropsType){
  return(
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-9">
      <div className="w-full p-5 flex flex-col gap-5">
        <div className={cn(itemsStyle,"relative w-full h-15")}>
          <EventTextInput
            placeholder={event.title}
            disabled={true}
            color={event.color}
          />
        </div>
        <div className={cn(itemsStyle,"pl-5 pr-5 pt-2 pb-2")}>
          <div className="flex flex-row items-center justify-between">
            <div>시작</div>
            <div className="flex flex-row">
              <div className={cn(dateBox)}>
                {format(event.start,"yyyy.MM.dd")}
              </div>
              <div className={cn(dateBox)}>
                {format(event.start,"a hh:mm",{locale: ko})}
              </div>
            </div>
          </div>

          <Separator className="my-1"/>

          <div className="flex flex-row items-center justify-between">
            <div>종료</div>
            <div className="flex flex-row">
              <div className={cn(dateBox)}>
                {format(event.end,"yyyy.MM.dd")}
              </div>
              <div className={cn(dateBox)}>
                {format(event.end,"a hh:mm",{locale: ko})}
              </div>
            </div>
          </div>
        </div>
        <div className={cn(itemsStyle)}>
          <TextArea 
            className="border-none yoteyo-m-detail-lg rounded-b-none"
            placeholder={event.locate}
            disabled={true}
          />
          <TextArea 
            className="border-none yoteyo-m-detail-lg rounded-t-none"
            placeholder={event.memo}
            disabled={true}
          />
        </div>
        <Button
          className="w-full h-[56px]" 
          variant={"default"}
          onClick={onEdit}
          >
            수정
        </Button>
      </div>
    </div>
  )
}