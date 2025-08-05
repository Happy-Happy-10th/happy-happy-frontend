//이밴트 색상 타입 선언
export type EventColor = 
"yoteyoRed" | 
"yoteyoOrange" | 
"yoteyoYellow" | 
"yoteyoGreen" | 
"yoteyoEmerald"|
"yoteyoSky"|
"yoteyoBlue"|
"yoteyoPurple"|
"yoteyoPink"|
"yoteyoBlack";
export type EventRepeat ="day"|"week"|"month"|"year"|"none";
export type CalendarEventType = {
  title: string;
  allDay : boolean;
  start: Date;
  end: Date;
  reoeat : EventRepeat;
  color: EventColor;
  locate : string;
  memo : string;
}

export type ApiCalendarEventType = {
  title: string;
  allDay : boolean;
  start: string;
  end: string;
  reoeat : EventRepeat;
  color: string;
  colorType : EventColor;
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