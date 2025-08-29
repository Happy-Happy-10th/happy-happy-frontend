import { DateHeaderProps } from 'react-big-calendar';
import { format, isSameDay } from 'date-fns';
//CSS
import { cn } from '@/utils/tailwind-utils';
//components
import { Text } from '@/components/base';

export function CalendarDateHeader(props: DateHeaderProps) {
  const { date, label, isOffRange } = props;

  const day = date.getDay(); // 0 = Sun, 6 = Sat
  const isToday = isSameDay(date, new Date()); // 오늘 날짜 비교

  return (
    <div className={cn('flex justify-center items-center h-6 pt-1')}>
      <div
        className={cn(
          'm-0 p-o w-[24px] h-[24px] flex justify-center items-center',
          day === 0 && 'text-red-500',
          day === 6 && 'text-blue-500',
          isOffRange && 'opacity-50',
          isToday && 'bg-yoteyo-main rounded-full text-white font-normal',
        )}
      >
        <Text variant={'body4'}>{format(date, 'd')}</Text> {/* 일(day) 출력 */}
      </div>
    </div>
  );
}
