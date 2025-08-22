import { notFound } from "next/navigation";
import { CalendarEventType } from "@/@types/calendar";
import { 
  Box,
  Text
} from "@/components/base";
import { convertEventStringToDate, base64UrlDecodeToString } from "@/utils";
import { UserEventForm } from "@/components/features";

type SharedPageType = {searchParams: Promise<{ d?: string }>;}
export default async function SharedPage({searchParams}:SharedPageType){
  const { d } = await searchParams;
  if (!d) return notFound();

  let event:CalendarEventType;
  // try {
  //   const json=base64UrlDecodeToString(d);
  //   const raw = JSON.parse(json);
  //   event = convertEventStringToDate(raw);
  // } catch (e){
  //   console.error("Invalid shared event", e);
  //   return notFound();
  // }

  return(
    <Box className="w-full h-full flex flex-col justify-center items-center bg-yoteyo-bg-default overflow-hidden">
      <Box className="bg-yoteyo-main xl:w-123 w-[80%] h-17 text-white flex justify-center items-center rounded-[8px]">
        <Text variant={"title2"}>공유 받은 일정을 확인해보세요</Text>
      </Box>
      <Box className="flex flex-col xl:w-123 w-[80%] flex-1 min-h-0 h-full overflow-auto">
        <UserEventForm mode="shared"/>
      </Box>
    </Box>
  )
}