"use client"
import { useState } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToolbarProps } from "react-big-calendar";
import { ChevronDown, ChevronUp, RotateCcw, Settings } from 'lucide-react';

import { CalendarEventType } from '@/@types/calendar';

// import { MonthNavigator } from '@/components/features';
import { MonthNavigator } from '@/components/features/monthNavigator';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCalendarContext } from '../provider/CalendarContext';

export default function CalendarToolbar({
  date,
  onNavigate,
}: ToolbarProps<CalendarEventType>) {
  const { events, isMondayStart, currentDate, handleCurrentDate } = useCalendarContext();
  const formatted = format(date, 'yyyy.M', { locale: enUS });

  const [monthPickerOpen,setMonthPickerOpen ] = useState(false);
  const handleMonthPickerOn = ()=>setMonthPickerOpen(true);
  const handleMonthPickerOff = ()=> setMonthPickerOpen(false);
  
  return (
    <div className="w-full flex justify-between bg-yoteyo-gray-100 pb-[10px]">
      <div className='flex flex-row items-center gap-[6px]'>
        <span className="text-[30px] font-bold w-[105px]">{formatted}</span>
        <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
          <PopoverTrigger asChild>
            <Button type='button' variant={"ghost"} onClick={handleMonthPickerOn}>
              {monthPickerOpen?<ChevronUp />:<ChevronDown />}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <MonthNavigator 
              currentDate={currentDate} 
              handleCurrentDate={handleCurrentDate} 
              handleMonthPickerOff={handleMonthPickerOff}/>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row items-center gap-[14px]">
        <button className='w-[66px] h-[24px] rounded-[50px] border-1 border-solid flex justify-center items-center gap-[4px]'>
          <RotateCcw size={'10px'}/>
          <span>Today</span>
        </button>
        <Button type='button' variant={"ghost"}>
          <Settings size={24}/>
        </Button>
      </div>
    </div>
  );
}
