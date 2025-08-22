import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
import {Text} from '@/components/base'
//test
import { CalendarEventType } from '@/@types/calendar';
const COLOR_MAP = {
  yoteyoRed: 'bg-yoteyo-red',
  yoteyoOrange: 'bg-yoteyo-orange',
  yoteyoYellow: 'bg-yoteyo-yellow',
  yoteyoGreen: 'bg-yoteyo-green',
  yoteyoEmerald: 'bg-yoteyo-emerald',
  yoteyoSky: 'bg-yoteyo-sky',
  yoteyoBlue: 'bg-yoteyo-blue',
  yoteyoPurple: 'bg-yoteyo-purple',
  yoteyoPink: 'bg-yoteyo-pink',
  yoteyoBlack: 'bg-yoteyo-black',
  default: 'bg-yoteyo-main',
} as const;

const evnetBarVariants = cva(
  `w-full h-full flex flex-row justify-between rounded-[4px] overflow-hidden select-none`,{
    variants: {variant: COLOR_MAP},
    defaultVariants : {variant:'yoteyoGreen'}
});

const evnetMinimalBarVariants = cva(
  `w-full h-[6px] rounded-[2px]`, {
    variants: {variant: COLOR_MAP},
    defaultVariants : {variant:'yoteyoGreen'}
});

export function CalendarEventDetail({ 
  title, 
  allDay, 
  startDate, 
  endDate, 
  repeatCycle, 
  color="yoteyoGreen", 
  locate, 
  memo 
}: CalendarEventType) {
  return (
    <div className={cn(evnetBarVariants({ variant: color }))}>
      <div className="w-[95%] flex justify-center">
        <Text variant={"detail2"}>{title}</Text>
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
  color="yoteyoGreen", 
  locate, 
  memo 
}: CalendarEventType) {
  return <div className={cn(evnetMinimalBarVariants({ variant: color }))}></div>;
}
