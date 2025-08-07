import { CalendarEventType } from "@/@types/calendar";
import { getUserEvents, getUserSetting, postUserEvent, putUserEvent } from "@/api/fragments/calendar/calendarFragments";
import { convertEventsStringToDate } from "@/utils/calendar/dateConverter";

const calendarService = {
  getEvents : async (year:number,calendarId:string)=> {
    const {result} = await getUserEvents(year,calendarId).then(res => res.json());
    const events = convertEventsStringToDate(result);
    return events
  },
  postEvent: async(payload:CalendarEventType)=>(await postUserEvent(payload)).json(),
  putEvent : async(payload:CalendarEventType)=>(await putUserEvent(payload)).json(),
  setting : async ()=>(await getUserSetting()).json(),
}

export {calendarService};