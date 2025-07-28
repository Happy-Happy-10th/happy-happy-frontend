import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToolbarProps } from "react-big-calendar";
import { ChevronDown, RotateCcw, Settings } from 'lucide-react';

import { CalendarEventType } from '@/@types/calendar';

export default function CalendarToolbar({
  date,
  onNavigate,
}: ToolbarProps<CalendarEventType>) {
  const formatted = format(date, 'yyyy.M', { locale: enUS });
  return (
    <div className="w-full flex justify-between bg-yoteyo-gray-100 pb-[10px]">
      <div className='flex flex-row items-center gap-[6px]'>
        <span className="text-[30px] font-bold">{formatted}</span>
        <ChevronDown />
      </div>
      <div className="flex flex-row items-center gap-[14px]">
        <button className='w-[66px] h-[24px] rounded-[50px] border-1 border-solid flex justify-center items-center gap-[4px]'>
          <RotateCcw size={'10px'}/>
          <span>Today</span>
        </button>
        <Settings size={24}/>
      </div>
    </div>
  );
}
