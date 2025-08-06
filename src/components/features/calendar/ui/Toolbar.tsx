"use client"
import { useState } from 'react';
import { format, isSameMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ToolbarProps } from "react-big-calendar";
import { ChevronDown, ChevronUp, RotateCcw, Settings } from 'lucide-react';

import { CalendarEventType } from '@/@types/calendar';
import { MonthNavigator } from '@/components/features/monthNavigator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCalendarContext } from '../provider/CalendarContext';
import { BacktodayIcon, Button, Icon, SettingIcon } from '@/components/base';

export default function CalendarToolbar({
  date,
  onNavigate,
}: ToolbarProps<CalendarEventType>) {
  const { events, isMondayStart, currentDate, handleCurrentDate } = useCalendarContext();
  const formatted = format(date, 'yyyy.M', { locale: enUS });

  const [monthPickerOpen,setMonthPickerOpen ] = useState(false);
  const handleMonthPickerOn = ()=>setMonthPickerOpen(true);
  const handleMonthPickerOff = ()=> setMonthPickerOpen(false);
  
  const today = new Date();
  const isToday = isSameMonth(date, today)

  return (
    <div className="w-full flex justify-between bg-yoteyo-gray-100 pb-[10px]">
      <div className='flex flex-row items-center gap-[16px]'>
        <span className="text-[30px] font-bold w-[110px]">{formatted}</span>
        <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              className='w-7 h-3'
              type='button' 
              variant={"icon"} 
              onClick={handleMonthPickerOn}>
              {monthPickerOpen?<ChevronUp />:<ChevronDown />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[230px] h-[231px] p-0 m-0'>
            <MonthNavigator 
              currentDate={currentDate} 
              handleCurrentDate={handleCurrentDate} 
              handleMonthPickerOff={handleMonthPickerOff}/>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row items-center gap-[18px]">
        {!isToday && (
          <div 
            className='hover:cursor-pointer'
            onClick={()=>{
              handleCurrentDate(today);
              onNavigate('DATE', today);
            }}
            >
            <Icon className='w-20 h-6'>
              <BacktodayIcon/>
            </Icon>
          </div>
        )}
        <div className='hover:cursor-pointer'>
          <Icon className='w-6 h-6'>
            <SettingIcon/>
          </Icon>
        </div>
      </div>
    </div>
  );
}
