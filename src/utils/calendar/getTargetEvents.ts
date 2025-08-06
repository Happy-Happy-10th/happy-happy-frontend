import { CalendarEventType } from "@/@types/calendar";
import { isAfter, isBefore, isEqual, startOfDay, endOfDay } from "date-fns";

export function getTodayEvents(
  events: CalendarEventType[],
  limit?: number
): CalendarEventType[] {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const todayEvents = events.filter((event) => {
    const eventStart = event.start;
    const eventEnd = event.end;

    const startsBeforeOrToday =
      isBefore(eventStart, todayEnd) || isEqual(eventStart, todayEnd);
    const endsAfterOrToday =
      isAfter(eventEnd, todayStart) || isEqual(eventEnd, todayStart);

    return startsBeforeOrToday && endsAfterOrToday;
  });

  return limit ? todayEvents.slice(0, limit) : todayEvents;
}


export function getUpcomingEvents(events:CalendarEventType[],count:number):CalendarEventType[]{
  const todayEnd = endOfDay(new Date());

  return events
    .filter((event) => isAfter(event.start, todayEnd))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, count);
}