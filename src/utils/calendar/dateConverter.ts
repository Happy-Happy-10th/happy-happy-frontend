import { ApiCalendarEventType, CalendarEventType } from "@/@types/calendar";

/**
 * 문자열로 처리된 날짜정보를 Date객채로 변환하는 함수
 * @param apiResponse api를통해 가져온 이밴트 결과값
 * @returns 캘린더에 등록할 event 배열
 */
export function convertStringToDate
(apiResponse:ApiCalendarEventType[]):CalendarEventType[]{
console.log(apiResponse[0].start)
  return apiResponse.map((res)=>({
    ...res,
    start : fixDate(parseDateString(res.start)),
    end : fixDate(parseDateString(res.end)),
  }))
}

export function convertDateToString(events:CalendarEventType[]){

}

/* String 날짜 데이터를 Date 객채로 변경하기 위한 서브 함수들 */
type DateInput = {
  year: number;
  month: number; // 1~12
  day: number;
  hour?: number;
  minute?: number;
};
function parseDateString(str: string): DateInput {
  const [year, month, day, hour, minute] = str.split('-').map(Number);
  return { year, month, day, hour, minute };
}

function fixDate({ year, month, day, hour = 0, minute = 0 }: DateInput): Date {
  return new Date(year, month - 1, day, hour, minute);
}

export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // JS는 0부터 시작하므로 +1
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month}-${day}-${hour}-${minute}`;
}