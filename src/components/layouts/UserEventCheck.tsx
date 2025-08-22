import { cn } from '@/utils/tailwind-utils';
import clsx from 'clsx';
import { AlertRedIcon, Box, Button, EventTextInput, Text } from '@/components/base';
import { CalendarEventType } from '@/@types/calendar';
import { Separator } from '@radix-ui/react-select';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import TextArea from '../base/TextArea/TextArea';
import { useState } from 'react';
import { base64UrlEncode, copyText } from '@/utils';

const itemsStyle = clsx('w-full bg-white rounded-[8px]');
const dateBox = clsx(
  'flex justify-center items-center',
  'bg-yoteyo-gray-100 font-yoteyo-p-body-lg rounded-md',
  'hover:cursor-pointer hover:text-yoteyo-main',
  'w-[107px] h-9 xl:h-8',
);

type PropsType = {
  event: CalendarEventType;
  onEdit?: () => void;
  onDelete?: () => void;
};
export default function UserEventCheck({ event, onEdit, onDelete }: PropsType) {
  const [shared, setShared] = useState<boolean>(false);
  const handleShared = () => {
    setShared(true);
    //인코딩
    const URLText = base64UrlEncode(JSON.stringify(event));
    //URL 설정
    const SHARE_ROUTE = '/shared';
    const url = new URL(SHARE_ROUTE, window.location.origin);
    url.searchParams.set('d', URLText);
    const sharedURL = url.toString();
    // 클립보드 복사
    copyText(sharedURL);
  };
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-9">
      <Box className="flex flex-col gap-2 pt-5 pl-5 pr-5">
        <Box className="w-full flex justify-end">
          <Button className="w-30 h-10" variant={'default'} type="button" onClick={handleShared}>
            <Text variant={'body3'}>공유하기</Text>
          </Button>
        </Box>
        {shared && (
          <Box className="w-full p-3 bg-white flex flex-col">
            <Text variant={'body2'}>클립보드 복사완료.</Text>
          </Box>
        )}
      </Box>
      <div className="w-full p-5 flex flex-col gap-5">
        <div className={cn(itemsStyle, 'relative w-full h-15')}>
          <EventTextInput
            className="disabled:text-yoteyo-black disabled:text-[22px] disabled:font-bold disabled:opacity-100"
            value={event.title}
            disabled={true}
            color={event.color}
          />
        </div>
        <div className={cn(itemsStyle, 'pl-5 pr-5 pt-2 pb-2')}>
          <div className="flex flex-row items-center justify-between">
            <div>시작</div>
            <div className="flex flex-row">
              <div className={cn(dateBox)}>{format(event.startDate, 'yyyy.MM.dd')}</div>
              <div className={cn(dateBox)}>{format(event.startDate, 'a hh:mm', { locale: ko })}</div>
            </div>
          </div>

          <Separator className="my-1" />

          <div className="flex flex-row items-center justify-between">
            <div>종료</div>
            <div className="flex flex-row">
              <div className={cn(dateBox)}>{format(event.endDate, 'yyyy.MM.dd')}</div>
              <div className={cn(dateBox)}>{format(event.endDate, 'a hh:mm', { locale: ko })}</div>
            </div>
          </div>
        </div>
        <div className={cn(itemsStyle)}>
          <TextArea
            className="min-h-1 border-none rounded-none text-[20px] md:text-[20px] placeholder:text-[20px]"
            value={event.locate}
            rows={3}
            disabled={true}
          />
          <TextArea
            className="min-h-20 text-[20px] md:text-[20px] border-none rounded-none"
            value={event.memo}
            disabled={true}
            rows={3}
          />
        </div>
        <Box className="w-full flex flex-row gap-2">
          <Button type="button" className="w-1/2 h-[56px]" variant={'outline'} onClick={onDelete}>
            삭제
          </Button>

          <Button type="button" className="w-1/2 h-[56px]" variant={'default'} onClick={onEdit}>
            수정
          </Button>
        </Box>
      </div>
    </div>
  );
}
