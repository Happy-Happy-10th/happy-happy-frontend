import { getUserEvents, getUserSetting } from "@/api/fragments/calendar/calendarFragments";
import { convertStringToDate } from "@/utils/calendar/dateConverter";

const calendarService = {
  events : async ()=> {
    const {result, isMondayStart} = await getUserEvents().then(res => res.json());
    const events = convertStringToDate(result);
    return {events, isMondayStart}
  },
  setting : async ()=>(await getUserSetting()).json(),
}

export {calendarService};