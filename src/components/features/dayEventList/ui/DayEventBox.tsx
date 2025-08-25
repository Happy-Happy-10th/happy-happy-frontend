import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { CalendarEventType } from '@/@types/calendar';
import { cn } from '@/utils/tailwind-utils';
import { convertEventDateToString } from '@/utils/calendar/dateConverter';
import { forwardRef } from 'react';
import { Text } from '@/components/base';

const eventChildVariants = cva(`pl-[5px] w-[6px] h-full rounded-l-[8px]`, {
  variants: {
    variant: {
      yoteyoRed: 'bg-yoteyo-red',
      yoteyoOrange: 'bg-yoteyo-orange',
      yoteyoYellow: 'bg-yoteyo-yellow',
      yoteyoGreen: 'bg-yoteyo-green',
      yoteyoEmerald: `bg-yoteyo-emerald`,
      yoteyoSky: `bg-yoteyo-sky`,
      yoteyoBlue: `bg-yoteyo-blue`,
      yoteyoPurple: `bg-yoteyo-purple`,
      yoteyoPink: `bg-yoteyo-pink`,
      yoteyoNavy: `bg-yoteyo-navy`,
      yoteyoGray: `bg-yoteyo-gray`,
      default: 'bg-yoteyo-main',
    },
  },
});

const eventBox = clsx(
  'border-1 border-solid rounded-[8px] border-[#EAEAEA]',
  'w-full h-[64px]',
  'flex flex-row',
  'hover:cursor-pointer',
);

const eventContents = clsx('flex flex-col justify-center', 'pl-[11px]');

type PropsType = {
  event: CalendarEventType;
};
const DayEventBox = forwardRef<HTMLDivElement, PropsType>(({ event }, ref) => {
  const viewEvent = convertEventDateToString(event);
  const startDate = viewEvent.startDate.split('T');
  const endDate = viewEvent.endDate.split('T');
  return (
    <div className={eventBox} ref={ref}>
      <div className={cn(eventChildVariants({ variant: event.color }))}></div>
      <div className={eventContents}>
        <Text variant={'body3'} className="font-bold">
          {viewEvent.title}
        </Text>
        <Text variant={'body4'}>{`${startDate[0]} ~ ${endDate[0]}`}</Text>
      </div>
    </div>
  );
});

export default DayEventBox;
