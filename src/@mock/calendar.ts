import { CalendarEventType } from "@/@types/calendar";

export const calendarEventsMock = [
  {
    title: "팀 회의를 해야하는데 아마 이때가 적당하지 않을까 생각하는데요...?",
    start: new Date(2025, 6, 8, 10, 0),
    end: new Date(2025, 6, 8, 11, 30),
    color: "#1A73E8",
    stage: 1,
    allDay: false,
  },
  {
    title: "디자인 리뷰",
    start: new Date(2025, 6, 9, 13, 0),
    end: new Date(2025, 6, 9, 14, 0),
    color: "#F97316",
    stage: 2,
    allDay : false
  },
  {
    title: "개발 완료",
    start: new Date(2025, 6, 11),
    end: new Date(2025, 6, 11),
    color: "#22C55E",
    stage: 3,
    allDay: true,
  },
  {
    title: "올리브영 특가 할인세일 처럼 이름이 길면 어떻게 랜더링 되는지 몹시 궁금해서 테스트를 해봅니다.",
    start: new Date(2025, 6, 11),
    end: new Date(2025, 6, 17),
    color: "#F97316",
    stage: 2,
    allDay : true
  },
  {
    title: "2일짜리 스케쥴은 5일보다 아래?",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    stage: 2,
    allDay : true
  },
];

export const calendarEvents:CalendarEventType[] = [
  {
    title: "무신사",
    start: new Date(2025, 6, 8, 10, 0),
    end: new Date(2025, 6, 8, 11, 30),
    color: "#1A73E8",
    colorType:"yoteyoRed",
    stage: 1,
    allDay: false,
  },
  {
    title: "올리브영",
    start: new Date(2025, 6, 9, 13, 0),
    end: new Date(2025, 6, 9, 14, 0),
    color: "#F97316",
    colorType:"yoteyoOrange",
    stage: 2,
    allDay : false
  },
  {
    title: "하이마트",
    start: new Date(2025, 6, 11),
    end: new Date(2025, 6, 11),
    color: "#22C55E",
    colorType:"yoteyoYellow",
    stage: 3,
    allDay: true,
  },
  {
    title: "쿠팡",
    start: new Date(2025, 6, 11),
    end: new Date(2025, 6, 17),
    color: "#F97316",
    colorType:"yoteyoGreen",
    stage: 2,
    allDay : true
  },
    {
    title: "CGV",
    start: new Date(2025, 6, 15),
    end: new Date(2025, 6, 18),
    color: "#F97316",
    colorType:"yoteyoEmerald",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoSky",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스2",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoBlue",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스3",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoPurple",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스4",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoPink",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스5",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoBlack",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스6",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoBlack",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스7",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoBlack",
    stage: 2,
    allDay : true
  },
  {
    title: "홈플러스8",
    start: new Date(2025, 6, 11, 13, 0),
    end: new Date(2025, 6, 12, 12, 0),
    color: "#F97316",
    colorType:"yoteyoBlack",
    stage: 2,
    allDay : true
  },
];
