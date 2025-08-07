import { yoteyoAPI } from "@/api";
import { CalendarEventType, GetEventsType } from "@/@types/calendar";

export async function getUserEvents(year:number){
  return await yoteyoAPI<GetEventsType>('calendar/events',{
    method : 'get',
    headers:{
      'Content-Type': 'application/json',
    }
  })
}

export async function postUserEvent(payload:CalendarEventType){
  return await yoteyoAPI<GetEventsType>('calendar/events',{
    method:'post',
    headers:{'Content-Type': 'application/json'},
    body : JSON.stringify({...payload})
  })
}

export async function putUserEvent(payload:CalendarEventType){
  return await yoteyoAPI<GetEventsType>(`calendar/events/${payload.id}`,{
    method:'put',
    headers:{'Content-Type': 'application/json'},
    body : JSON.stringify({...payload})
  })
}

export async function getUserSetting(){
  return await yoteyoAPI('getUserSettings',{
    method : 'get',
    headers:{
      'Content-Type': 'application/json',
    }
  })
}