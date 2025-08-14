import { CalendarEventType } from "@/@types/calendar";
import { startOfDay, endOfDay, areIntervalsOverlapping } from "date-fns";

/**
 * targetDate가 (startDate ~ endDate)에 포함되는 모든 이벤트를 반환하는 함수
 * @param events Api를 통해 받아온 이밴트들
 * @param targetDate 필터링할 이밴트 날짜(없으면 오늘로 처리)
 * @returns 필터 결과값
 */
export function getEventsByDay
(events : CalendarEventType[],targetDate : Date = new Date()):CalendarEventType[]{
  const dayStart = startOfDay(targetDate);
  const dayEnd = endOfDay(targetDate);

  return events.filter((e)=>{
    areIntervalsOverlapping(
      { start: e.startDate, end: e.endDate },
      { start: dayStart, end: dayEnd },
      { inclusive: true }
    )
  })
}