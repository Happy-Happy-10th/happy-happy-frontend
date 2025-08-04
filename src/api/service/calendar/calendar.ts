import { getUserEvents, getUserSetting } from "@/api/fragments/calendar/calendarFragments";
import { convertEventsStringToDate } from "@/utils/calendar/dateConverter";

const calendarService = {
  events : async ()=> {
    const {result, isMondayStart} = await getUserEvents().then(res => res.json());
    const events = convertEventsStringToDate(result);
    return {events, isMondayStart}
  },
  setting : async ()=>(await getUserSetting()).json(),
}

export {calendarService};