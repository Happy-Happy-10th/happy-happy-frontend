import { yoteyoAPI } from '@/api';
import { CalendarEventType, ApiCalendarEventType, ApiGetEvnetsResponseType } from '@/@types/calendar';

export async function getUserEvents(year: number, calendarId: number) {
  return await yoteyoAPI<ApiGetEvnetsResponseType>('calendar/events', {
    method: 'get',
    searchParams: {
      year: year.toString(),
      calendarId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function postUserEvent(payload: CalendarEventType) {
  const { id, ...rest } = payload;
  return await yoteyoAPI<ApiCalendarEventType>('calendar/events', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...rest }),
  });
}

export async function putUserEvent(payload: CalendarEventType) {
  const { id, ...rest } = payload;
  return await yoteyoAPI<ApiCalendarEventType>(`calendar/events/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...rest }),
  });
}

export async function DeleteEvent(eventId: number) {
  return await yoteyoAPI(`calendar/events/${eventId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function getUserSetting() {
  return await yoteyoAPI('getUserSettings', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
