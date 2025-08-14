import { HeaderProps } from "react-big-calendar";
import { format } from 'date-fns';
import {ko} from "date-fns/locale";
//components
import {Text} from '@/components/base'

export function CalendarMonthHeader({ date }: HeaderProps) {
  const day = format(date, 'EEE', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭

  return (
    <div className="text-center h-6 text-yoteyo-gray-300">
      <Text variant={"body4"}>
        {day}
      </Text>
    </div>
  );
}
