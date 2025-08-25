import { RepeatType, EventColor } from './pickerType';

export type CalendarEventType = {
  id: number;
  calendarId: number;
  title: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  repeatCycle: RepeatType;
  color: EventColor;
  locate: string;
  memo: string;
  holiday: boolean;
  isPending: boolean;
  isYoteyo: boolean;
};

export type ApiCalendarEventType = {
  id: number;
  calendarId: number;
  title: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  repeatCycle: RepeatType;
  color: EventColor;
  locate: string;
  memo: string;
  holiday: boolean;
  // isPending: boolean;
  // isYoteyo: boolean;
};

export type ApiGetEvnetsResponseType = {
  status: number;
  message: string;
  data: ApiCalendarEventType[];
};
