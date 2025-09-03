'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SlotInfo } from 'react-big-calendar';

//zustand
import { useStore } from 'zustand';
import { useAuthStore, useUserSettingStore, useSidePanelStore } from '@/store';
//api
import { queryKeys, userSettingsService } from '@/api';
import { calendarService } from '@/api/service/calendar';
import { useQuery } from '@tanstack/react-query';

import { CalendarEventType } from '@/@types/calendar';
import { useDateState, useMediaQuery } from '@/hooks';
import { getEventsByDay } from '@/utils';

import { CustomCalendar, DayEventList } from '@/components/features';
import { cn } from '@/utils/tailwind-utils';
import { SidePanelWrapper, SidePanel } from '@/components/base';

const contents = clsx(
  'content relative w-full h-full flex gap-[20px] bg-yoteyo-bg-default',
  'xl:p-[30px] xl:pb-[5px]',
  'flex-col xl:flex-row',
  'xl:overflow-hidden overflow-y-scroll',
);

const calendarSize = clsx(
  'bg-white',
  'ml-[20px] mr-[20px] mt-[26px]',
  'xl:ml-0 xl:mr-0 xl:mt-0',
  'min-h-[650px] xl:max-h-full xl:min-h-0 [@media(max-height:750px)]:min-h-[480px]',
  'xl:max-w-[896px] xl:w-full',
);

const eventList = clsx('bg-white rounded-[8px]', 'xl:w-[304px] xl:h-auto xl:mt-15 flex-1');
export default function CalendarPage() {
  //전역 상태 불러오기
  const { user } = useStore(useAuthStore);
  const { setUserSetting } = useStore(useUserSettingStore);

  //캘린더에 View 될 날짜
  const [currentDate, setCurrentDate] = useDateState(new Date());

  //캘린더에서 선택된 Slot의 날짜& SlotSelect 핸들러
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSlotSelected = (slot: SlotInfo) => {
    const day = slot.start;
    setSelectedDate(day);
  };

  //선택된 또는 기본 날짜로 필터링한 이밴트
  const [dayEvents, setDayEvents] = useState<CalendarEventType[]>([]);

  // useQuery 적용
  const year = currentDate.getFullYear();
  // year 파라미터를 클로저로 캡쳐해서 사용? (year)=>calendarService.getEvents(year) X
  const { data: eventsData } = useQuery({
    queryKey: queryKeys.calendar.events(year).queryKey,
    queryFn: () => calendarService.getEvents(year, user!.calendarId),
    enabled: !!user?.calendarId,
  });

  const { data: userSettings, isSuccess } = useQuery({
    queryKey: queryKeys.calendar.userSettings().queryKey,
    queryFn: () => userSettingsService.getUserSetting(user!.calendarId),
    enabled: !!user?.calendarId,
  });

  useEffect(() => {
    if (isSuccess) {
      setUserSetting(userSettings);
    }
  }, [userSettings, isSuccess]);

  const EMPTY: CalendarEventType[] = [];
  const safeData = eventsData ?? EMPTY;

  useEffect(() => {
    //최초 or 슬록 선택시 뷰 제어
    setDayEvents(getEventsByDay(safeData, selectedDate));
    // setDayEvents(getEventsByDay(calendarEvents, selectedDate));
  }, [eventsData, selectedDate]);

  // 뷰포트에 따라 Drawer vs 사이드패널
  const BREAKPOINT = '1000px' as const;
  const isWide = useMediaQuery(`(min-width:${BREAKPOINT})`, true);
  const isOpen = useSidePanelStore(s => s.isOpen('calendarRoot'));
  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CustomCalendar
          className={cn('w-full h-full', isWide && isOpen && 'w-[750px]')}
          events={eventsData}
          isMondayStart={userSettings?.weekStartDay === 'MONDAY' ? true : false}
          viewDate={currentDate}
          onChangeViewDate={setCurrentDate}
          selectedDate={selectedDate}
          onSlotSelected={handleSlotSelected}
        />
      </div>
      <div className={cn(eventList, 'shadow-[var(--shadow-box)]')}>
        <DayEventList selectedDate={selectedDate} dayEvents={dayEvents} />
      </div>
    </div>
  );
}
