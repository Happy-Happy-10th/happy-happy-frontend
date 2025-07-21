//이밴트 색상 타입 선언
export type EventColor = "type1" | "type2" | "type3" | "type4" | "default";
export type CalendarEventType = {
  start: Date;
  end: Date;
  title: string;
  color: string;
  colorType : EventColor;
  stage : number;
  allDay : boolean;
}

export type ApiCalendarEventType = {
  start: string;
  end: string;
  title: string;
  color: string;
  stage : number;
  allDay : boolean;
}

export type ApiResponseType = {
  result : ApiCalendarEventType[],
  status : number;
}

export interface GetEventsType{
  isMondayStart : boolean;
  result : ApiCalendarEventType[]
}