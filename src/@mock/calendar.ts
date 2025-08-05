import { CalendarEventType } from "@/@types/calendar";

export const calendarEventsNone = [];

export const calendarEvents:CalendarEventType[] = [
  {
    title: "무신사",
    allDay: true,
    start: new Date(2025, 7, 8, 10, 0),
    end: new Date(2025, 7, 8, 11, 30),
    repeat:null,
    color: "yoteyoRed",
    locate : "홍대 무신사 스튜디오",
    memo : "무신사 무진장 세일"
  },
  {
    title: "올리브영",
    allDay: true,
    start: new Date(2025, 7, 8, 10, 0),
    end: new Date(2025, 7, 8, 11, 30),
    repeat:"day",
    color: "yoteyoBlue",
    locate : "전국 올리브영 매장",
    memo : "올영세일"
  },
  {
    title: "올리브영2",
    allDay: true,
    start: new Date(2025, 7, 20, 10, 0),
    end: new Date(2025, 7, 21, 21, 30),
    repeat:"day",
    color: "yoteyoBlue",
    locate : "전국 올리브영 매장2",
    memo : "올영세일2"
  },
  {
    title: "이마트 깜짝 세일",
    allDay: true,
    start: new Date(2025, 7, 6, 13, 0),
    end: new Date(2025, 7, 21, 14, 30),
    repeat: null,
    color: "yoteyoBlue",
    locate : "전국 이마트 매장",
    memo : "이마트 깜짝 세일"
  },
  {
    title: "무신사 특급 대방출",
    allDay: true,
    start: new Date(2025, 7, 6, 13, 0),
    end: new Date(2025, 7, 21, 14, 30),
    repeat: null,
    color: "yoteyoOrange",
    locate : "전국 무신사 스튜디오",
    memo : "무신사 특급 대방출"
  },
  {
    title: "올영세일",
    allDay: true,
    start: new Date(2025, 7, 6, 13, 0),
    end: new Date(2025, 7, 21, 14, 30),
    repeat: null,
    color: "yoteyoEmerald",
    locate : "전국 올리브영",
    memo : "올영 세일"
  },
  {
    title: "네이버 강세일",
    allDay: true,
    start: new Date(2025, 7, 6, 13, 0),
    end: new Date(2025, 7, 21, 14, 30),
    repeat: null,
    color: "yoteyoPurple",
    locate : "네이버 강세일",
    memo : "네이버 강세일"
  },
];
