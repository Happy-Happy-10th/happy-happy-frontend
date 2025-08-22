'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SlotInfo } from 'react-big-calendar';

//zustand
import { useStore } from 'zustand';
import { useAuthStore } from '@/store';
//api
import { queryKeys } from '@/api';
import { calendarService } from '@/api/service/calendar';
import { useQuery } from '@tanstack/react-query';

import { CalendarEventType } from '@/@types/calendar';
import { useDateState } from '@/hooks';
import { getEventsByDay } from '@/utils';

import { CustomCalendar, DayEventList } from '@/components/features';
import { calendarEvents } from '@/@mock/calendar';

const contents = clsx(
  'w-full h-full flex gap-[20px] bg-yoteyo-gray-100',
  'xl:p-[30px] xl:pb-[5px]',
  'flex-col xl:flex-row',
);

const calendarSize = clsx(
  'bg-white flex-1',
  'min-h-[220px] xl:min-h-0',
  'ml-[20px] mr-[20px] mt-[26px]',
  'xl:ml-0 xl:mr-0 xl:mt-0',
);

const eventList = clsx('bg-white', 'xl:w-[304px] h-[187px] xl:h-auto xl:mt-[48px]', 'rounded-[8px]');
export default function CalendarPage() {
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
  const { user } = useStore(useAuthStore);
  // year 파라미터를 클로저로 캡쳐해서 사용? (year)=>calendarService.getEvents(year) X
  const { data } = useQuery({
    queryKey: queryKeys.calendar.events(year).queryKey,
    queryFn: () => calendarService.getEvents(year, user!.calendarId),
    enabled: !!user?.calendarId,
  });

  const EMPTY: CalendarEventType[] = [];
  const safeData = data ?? EMPTY;

  useEffect(() => {
    //최초 or 슬록 선택시 뷰 제어
    // setDayEvents(getEventsByDay(safeData, selectedDate))
    setDayEvents(getEventsByDay(calendarEvents, selectedDate));
  }, [data, selectedDate]);

  return (
    <div className={contents}>
      <div className={calendarSize}>
        <CustomCalendar
          className="w-full h-full"
          // events={data}
          events={calendarEvents}
          viewDate={currentDate}
          onChangeViewDate={setCurrentDate}
          onSlotSelected={handleSlotSelected}
        />
      </div>
      <div className={eventList}>
        <DayEventList selectedDate={selectedDate} dayEvents={dayEvents} />
      </div>
    </div>
  );
}
