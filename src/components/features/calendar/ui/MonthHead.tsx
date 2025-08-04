import { format } from 'date-fns';
import {ko} from "date-fns/locale";
import { HeaderProps } from "react-big-calendar";

export default function CalendarMonthHeader({ date }: HeaderProps) {
  const day = format(date, 'EEE', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭

  return (
    <div className="text-center font-bold text-[#999999] text-[14px] border-none">
      {day}
    </div>
  );
}
