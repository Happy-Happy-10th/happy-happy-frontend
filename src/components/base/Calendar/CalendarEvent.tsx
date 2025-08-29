import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
import { Text } from '@/components/base';
//test
import { CalendarEventType } from '@/@types/calendar';
const BOLD_COLORMAP = {
  yoteyoRed: 'bg-yoteyo-red',
  yoteyoOrange: 'bg-yoteyo-orange',
  yoteyoYellow: 'bg-yoteyo-yellow',
  yoteyoGreen: 'bg-yoteyo-green',
  yoteyoEmerald: 'bg-yoteyo-emerald',
  yoteyoSky: 'bg-yoteyo-sky',
  yoteyoBlue: 'bg-yoteyo-blue',
  yoteyoPurple: 'bg-yoteyo-purple',
  yoteyoPink: 'bg-yoteyo-pink',
  yoteyoNavy: 'bg-yoteyo-navy',
  yoteyoGray: 'bg-yoteyo-gray',
  default: 'bg-yoteyo-main',
} as const;

const BOLD_TEXT_COLORMAP = {
  yoteyoRed: 'text-yoteyo-red',
  yoteyoOrange: 'text-yoteyo-orange',
  yoteyoYellow: 'text-yoteyo-yellow',
  yoteyoGreen: 'text-yoteyo-green',
  yoteyoEmerald: 'text-yoteyo-emerald',
  yoteyoSky: 'text-yoteyo-sky',
  yoteyoBlue: 'text-yoteyo-blue',
  yoteyoPurple: 'text-yoteyo-purple',
  yoteyoPink: 'text-yoteyo-pink',
  yoteyoNavy: 'text-yoteyo-navy',
  yoteyoGray: 'text-yoteyo-gray',
  default: 'text-yoteyo-main',
} as const;

const SOFT_COLORMAP = {
  yoteyoRed: 'bg-yoteyo-red-sub',
  yoteyoOrange: 'bg-yoteyo-orange-sub',
  yoteyoYellow: 'bg-yoteyo-yellow-sub',
  yoteyoGreen: 'bg-yoteyo-green-sub',
  yoteyoEmerald: 'bg-yoteyo-emerald-sub',
  yoteyoSky: 'bg-yoteyo-sky-sub',
  yoteyoBlue: 'bg-yoteyo-blue-sub',
  yoteyoNavy: 'bg-yoteyo-navy-sub',
  yoteyoPurple: 'bg-yoteyo-purple-sub',
  yoteyoPink: 'bg-yoteyo-pink-sub',
  yoteyoGray: 'bg-yoteyo-gray-sub',
  default: 'bg-white',
} as const;

const evnetBarVariants = cva(`w-full h-full flex flex-row justify-between rounded-[4px] overflow-hidden select-none`, {
  variants: { variant: SOFT_COLORMAP },
  defaultVariants: { variant: 'yoteyoGreen' },
});

const evnetMinimalBarVariants = cva(`w-full h-[6px] rounded-[2px]`, {
  variants: { variant: BOLD_COLORMAP },
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
        <Text variant={'detail2'} className={BOLD_TEXT_COLORMAP[color]}>
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
