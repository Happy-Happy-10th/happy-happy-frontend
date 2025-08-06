import { RepeatType,EventColor } from "./pickerType";

export type CalendarEventType = {
  title: string;
  allDay : boolean;
  start: Date;
  end: Date;
  repeat : RepeatType;
  color: EventColor;
  locate : string;
  memo : string;
}

export type ApiCalendarEventType = {
  title: string;
  allDay : boolean;
  start: string;
  end: string;
  repeat : RepeatType;
  color: EventColor;
  locate : string;
  memo : string;
}

export type ApiResponseType = {
  result : ApiCalendarEventType[],
  status : number;
}

export interface GetEventsType{
  isMondayStart : boolean;
  result : ApiCalendarEventType[]
}