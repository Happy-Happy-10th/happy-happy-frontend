import { RepeatType,EventColor } from "./pickerType";

export type CalendarEventType = {
  id:string;
  calendarId:string;
  title: string;
  allDay : boolean;
  startDate: Date;
  endDate: Date;
  repeatCycle : RepeatType;
  color: EventColor;
  locate : string;
  memo : string;
  holiday: boolean;
}

export type ApiCalendarEventType = {
  id:string;
  calendarId:string;
  title: string;
  allDay : boolean;
  startDate: string;
  endDate: string;
  repeatCycle : RepeatType;
  color: EventColor;
  locate : string;
  memo : string;
  holiday: boolean;
}

export type ApiResponseType = {
  result : ApiCalendarEventType[],
  status : number;
}

export interface GetEventsType{
  isMondayStart : boolean;
  result : ApiCalendarEventType[]
}