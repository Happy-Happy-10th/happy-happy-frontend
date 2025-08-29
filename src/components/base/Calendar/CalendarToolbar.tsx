'use client';
import { useState } from 'react';

// Date
import { format, isSameMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
// react-big-calendar
import { ToolbarProps } from 'react-big-calendar';
// Icon
import { ChevronDown, ChevronUp } from 'lucide-react';
//Type
import { SetDateHandler, CalendarEventType } from '@/@types';
//Components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BacktodayIcon, Box, Button, Icon, SettingIcon, Text } from '@/components/base';
import { MonthNavigator } from '@/components/features/monthNavigator';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import CalendarSettingForm from '@/components/features/Form/CalendarSettingFrom';

type CalendarToolbarType = {
  onChangeViewDate: SetDateHandler;
};
export function CalendarToolbar({
  date,
  onNavigate,
  onChangeViewDate,
}: ToolbarProps<CalendarEventType, object> & CalendarToolbarType) {
  // ToolBar 해더에 표시될 날짜
  const formatted = format(date, 'yyyy.M', { locale: enUS });

  // 년/월 선택용 Popover
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const handleMonthPickerOn = () => setMonthPickerOpen(true);
  const handleMonthPickerOff = () => setMonthPickerOpen(false);

  //달 같은 달의 경우 Today버튼 사라짐
  const today = new Date();
  const isToday = isSameMonth(date, today);

  return (
    <div className="w-full flex justify-between bg-yoteyo-bg-default pb-[10px] pl-[5px] pr-[5px]">
      <div className="flex flex-row items-center gap-[16px]">
        {/* 캘린더 상남 년 월 */}
        <Text variant={'title1'}>{formatted}</Text>
        <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
          <PopoverTrigger asChild>
            <Button className="w-7 h-3" type="button" variant={'icon'} onClick={handleMonthPickerOn}>
              {monthPickerOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[230px] h-[231px] p-0 m-0">
            <MonthNavigator
              currentDate={date}
              handleCurrentDate={onChangeViewDate}
              handleMonthPickerOff={handleMonthPickerOff}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row items-center gap-[18px]">
        {!isToday && (
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              onChangeViewDate(today);
              onNavigate('DATE', today);
            }}
          >
            <Icon className="w-20 h-6">
              <BacktodayIcon />
            </Icon>
          </div>
        )}
        <div className="hover:cursor-pointer">
          <Drawer>
            <DrawerTrigger asChild>
              <Icon className="w-6 h-6">
                <SettingIcon />
              </Icon>
            </DrawerTrigger>
            <DrawerContent className="bg-yoteyo-bg-modal">
              <DrawerHeader>
                <DrawerTitle>
                  <Text variant={'title2'}>환경설정</Text>
                </DrawerTitle>
              </DrawerHeader>
              <Box className="pl-5 pr-5">
                <CalendarSettingForm />
              </Box>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
