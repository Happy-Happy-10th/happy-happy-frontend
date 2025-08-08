import { CalendarEventType } from '@/@types/calendar';
import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';

const evnetBarVariants = cva(`w-full h-[6px] rounded-[2px]`, {
  variants: {
    variant: {
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
      default: `bg-yoteyo-main`,
    },
  },
});

export default function EventBar({ 
  title, 
  allDay, 
  startDate, 
  endDate, 
  repeatCycle, 
  color="yoteyoGreen", 
  locate, 
  memo 
}: CalendarEventType) {
  return <div className={cn(evnetBarVariants({ variant: color }))}></div>;
}
