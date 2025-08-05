import { CalendarEventType } from "@/@types/calendar";

export const calendarEventsNone = [];

export const calendarEvents:CalendarEventType[] = [
  {
    title: "무신사",
    allDay: true,
    start: new Date(2025, 7, 8, 10, 0),
    end: new Date(2025, 7, 8, 11, 30),
    reoeat:"none",
    color: "yoteyoRed",
    locate : "홍대 무신사 스튜디오",
    memo : "여름바지 사기"
  },
];
