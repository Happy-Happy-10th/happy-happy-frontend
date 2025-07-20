import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToolbarProps } from "react-big-calendar";
import { Calendar, Settings } from 'lucide-react';

import { CalendarEventType } from '@/@types/calendar';

export default function CalendarToolbar({
  date,
  onNavigate,
}: ToolbarProps<CalendarEventType>) {
  const formatted = format(date, 'MMMM', { locale: enUS });
  return (
    <div className="w-full flex justify-between">
      <span className="text-[30px] font-bold">{formatted}</span>
      <div className="flex flex-row items-center gap-[14px]">
        <Calendar size={24} />
        <Settings size={24}/>
      </div>
    </div>
  );
}
