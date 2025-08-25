import { ApiCalendarEventType, CalendarEventType } from '@/@types/calendar';

/**
 * 문자열로 처리된 날짜정보를 Date객채로 변환하는 함수
 * @TODO : Api 백엔드 반영되면 테스트 코드 제거 + Api 응답결과 타입 변경
 * @param apiResponse api를통해 가져온 이밴트 결과값
 * @returns 캘린더에 등록할 event 배열
 */
export function convertEventStringToDate(event: ApiCalendarEventType): CalendarEventType {
  return {
    ...event,
    isPending: false, //test
    isYoteyo: false, //test
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  };
}
export function convertEventsStringToDate(apiResponse: ApiCalendarEventType[]): CalendarEventType[] {
  return apiResponse.map(res => convertEventStringToDate(res));
}

/**
 * Date 객체로 처리된 날짜정보를 String객채로 변환하는 함수
 * @param event
 * @returns
 */
export function convertEventDateToString(event: CalendarEventType): ApiCalendarEventType {
  return {
    ...event,
    startDate: formatDateToString(event.startDate),
    endDate: formatDateToString(event.endDate),
  };
}

export function convertEventsDateToString(events: CalendarEventType[]): ApiCalendarEventType[] {
  return events.map(event => convertEventDateToString(event));
}
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}T${hour}:${minute}`;
}
