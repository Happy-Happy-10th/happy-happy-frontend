import { CalendarEventType } from "@/@types/calendar";
import selectStageBadge from "@/utils/calendar/selectStageBadge";
import Image from "next/image";



//TODO : 이밴트에 대한 Text 색상과 Event 왼쪽 디자인 요소 색상을 어떻게 추출할지 고민필요(ex 투명도 처리 등)
//TODO : Color Picker를 쓸경우 어두운 색일경우는 위 요소가 원하는 안보여질 가능성이 있음.
export default function CalendarEvent({
  start,
  end,
  title,
  color,
  stage,
  allDay
}: CalendarEventType) {
  const imagePath = selectStageBadge(stage);
  return (
    <div
      className="flex flex-row h-[20px] rounded-[4px] text-[11px] overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <div className="w-[2px] h-full bg-amber-500"></div>
      <div className="w-full flex justify-center">
          <Image
          src={imagePath}
          alt="badge"
          width={10}
          height={10}
          className="object-contain"
        />
        <div className="truncate flex items-center">{title}</div>
      </div>
    </div>
  );
}
