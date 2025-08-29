import { notFound } from 'next/navigation';
import { CalendarEventType } from '@/@types/calendar';
import { Box, Button, Text } from '@/components/base';

import { base64UrlDecodeToString } from '@/utils/calendar/URLBase64';
import { convertEventStringToDate } from '@/utils/calendar/dateConverter';
import { EventCheckForm } from '@/components/layouts/UserEventCheck';
import { RouteButton } from '@/components/features';

type SharedPageType = { searchParams: Promise<{ d?: string; sendUser?: string }> };
export default async function SharedPage({ searchParams }: SharedPageType) {
  const { d, sendUser } = await searchParams;
  if (!d) return notFound();

  let event: CalendarEventType;
  try {
    const json = base64UrlDecodeToString(d);
    const raw = JSON.parse(json);
    event = convertEventStringToDate(raw);
  } catch (e) {
    console.error('Invalid shared event', e);
    return notFound();
  }

  return (
    <Box className="w-full h-full flex justify-center items-center bg-yoteyo-bg-default overflow-hidden">
      <Box className="xl:w-130 w-full h-full flex flex-col pl-5 pr-5 gap-7">
        <Box className="flex flex-row items-center mt-10">
          <Text className="text-yoteyo-main" variant={'title2'}>
            {sendUser}
          </Text>
          <Text variant={'title2'}>님이 일정을 공유했어요!</Text>
        </Box>
        <Box className="flex flex-col xl:w-123 w-full h-full gap-7">
          <EventCheckForm event={event} />
          <RouteButton className="h-16 xl:w-123 w-full" variant={'default'} routePath={'/introduce'}>
            <Text variant={'body2'}>요때요 서비스 이용하러가기</Text>
          </RouteButton>
        </Box>
      </Box>
    </Box>
  );
}
