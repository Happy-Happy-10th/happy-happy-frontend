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
    memo : "무신사 무진장 세일"
  },
  {
    title: "올리브영",
    allDay: true,
    start: new Date(2025, 7, 8, 10, 0),
    end: new Date(2025, 7, 8, 11, 30),
    reoeat:"none",
    color: "yoteyoBlue",
    locate : "전국 올리브영 매장",
    memo : "올영세일"
  },
];
