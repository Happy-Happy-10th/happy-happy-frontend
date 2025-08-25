import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
import { Text } from '@/components/base';
//test
import { CalendarEventType } from '@/@types/calendar';
const MAIN_COLOR_MAP = {
  yoteyoRed: 'bg-yoteyo-red',
  yoteyoOrange: 'bg-yoteyo-orange',
  yoteyoYellow: 'bg-yoteyo-yellow',
  yoteyoGreen: 'bg-yoteyo-green',
  yoteyoEmerald: 'bg-yoteyo-emerald',
  yoteyoSky: 'bg-yoteyo-sky',
  yoteyoBlue: 'bg-yoteyo-blue',
  yoteyoPurple: 'bg-yoteyo-purple',
  yoteyoPink: 'bg-yoteyo-pink',
  yoteyoNavy: 'bg-yoteyo-black',
  default: 'bg-yoteyo-main',
} as const;

const SUB_TEXT_COLOR_MAP = {
  yoteyoRed: 'text-yoteyo-red-sub',
  yoteyoOrange: 'text-yoteyo-orange-sub',
  yoteyoYellow: 'text-yoteyo-yellow-sub',
  yoteyoGreen: 'text-yoteyo-green-sub',
  yoteyoEmerald: 'text-yoteyo-emerald-sub',
  yoteyoSky: 'text-yoteyo-sky-sub',
  yoteyoBlue: 'text-yoteyo-blue-sub',
  yoteyoNavy: 'text-yoteyo-navy-sub',
  yoteyoPurple: 'text-yoteyo-purple-sub',
  yoteyoPink: 'text-yoteyo-pink-sub',
  default: 'text-white',
};

const evnetBarVariants = cva(`w-full h-full flex flex-row justify-between rounded-[4px] overflow-hidden select-none`, {
  variants: { variant: MAIN_COLOR_MAP },
  defaultVariants: { variant: 'yoteyoGreen' },
});

const evnetMinimalBarVariants = cva(`w-full h-[6px] rounded-[2px]`, {
  variants: { variant: MAIN_COLOR_MAP },
  defaultVariants: { variant: 'yoteyoGreen' },
});

export function CalendarEventDetail({
  title,
  allDay,
  startDate,
  endDate,
  repeatCycle,
  color = 'yoteyoGreen',
  locate,
  memo,
}: CalendarEventType) {
  return (
    <div className={cn(evnetBarVariants({ variant: color }))}>
      <div className="w-[95%] flex justify-center">
        <Text variant={'detail2'} className={SUB_TEXT_COLOR_MAP[color]}>
          {title}
        </Text>
      </div>
    </div>
  );
}

export function CalendarEventMinimal({
  title,
  allDay,
  startDate,
  endDate,
  repeatCycle,
  color = 'yoteyoGreen',
  locate,
  memo,
}: CalendarEventType) {
  return <div className={cn(evnetMinimalBarVariants({ variant: color }))}></div>;
}
