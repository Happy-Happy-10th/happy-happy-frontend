import { yoteyoAPI } from "@/api";
import { GetEventsType } from "@/@types/calendar";

export async function getUserEvents(){
  return await yoteyoAPI<GetEventsType>('getCalendarEvents',{
    method : 'get',
    headers:{
      'Content-Type': 'application/json',
    }
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