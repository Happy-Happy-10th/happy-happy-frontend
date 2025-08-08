'use client';

import { useEffect, useRef } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import clsx from 'clsx';

import { Input } from '@/components/ui/input';
import { Button, ColorPicker, EventTextInput, RepeatPicker } from '@/components/base';
import { DateSelector } from '../dateSelector';
import TextArea from '@/components/base/TextArea/TextArea';
import { CalendarEventType } from '@/@types/calendar';
import { Text } from '@/components/base';
import { cn } from '@/utils/tailwind-utils';

import {useAuthStore} from '@/store'
import { useStore } from 'zustand';
import { DrawerClose } from '@/components/ui/drawer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api';
import { Variable } from 'lucide-react';
import { extractYear } from '@/utils/calendar/extractDate';
import { calendarService } from '@/api/service/calendar';

const itemsStyle = clsx('w-full bg-white rounded-[8px]');

type PropsType = {
  event?: CalendarEventType;
  mode ?: 'create' | 'edit'
};

export default function UserEventForm({ event, mode='create' }: PropsType) {
  //스크롤 감시 추가
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const queryClient = useQueryClient();
  // POST 전용 Mutate 생성
  const CreateEventMutation= useMutation({
    mutationFn:(apiData:CalendarEventType)=>calendarService.postEvent(apiData),
    onSuccess:(_res, Variables)=>{
      const year = extractYear(Variables.startDate);
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.events(year).queryKey,
    });
    }
  })
  // PUT 전용 Mutate 생성
  const putEventMutation = useMutation({
    mutationFn:(apiData:CalendarEventType)=>calendarService.putEvent(apiData),
    onSuccess:(_res, Variables)=>{
      const year = extractYear(Variables.startDate);
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.events(year).queryKey,
    });
    }    
  })

  //Zustand 캘린더 ID 가져오기
  const { user } = useStore(useAuthStore);

  //React-hook-form 선언
  const methods = useForm<CalendarEventType>({
    defaultValues: event || {
      id:0,
      calendarId : user!.calendarId,
      title: "",
      allDay: true,
      startDate: new Date(),
      endDate: new Date(),
      repeatCycle: null,
      color: 'yoteyoGreen',
      locate: '',
      memo: '',
      holiday:false
    },
  });
  const { control, handleSubmit } = methods;

  const onSubmit = (data: CalendarEventType) => {
    if (!user) return;

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const timezoneOffset = startDate.getTimezoneOffset() * 60000;
    const adjustedStartDate = new Date(startDate.getTime() - timezoneOffset);
    const adjustedEndDate = new Date(endDate.getTime() - timezoneOffset);
    const payload ={
      ...data,
      startDate : adjustedStartDate,
      endDate : adjustedEndDate,
      calendarId : user.calendarId
    }
    // POST Mutate 함수 동작
    if(mode === 'create'){
      CreateEventMutation.mutate(payload);
    }
    // PUT Mutate 함수 동작
    else if(mode ==='edit'){
      putEventMutation.mutate(payload)
    }
  };
  return (
    // ✅ FormProvider로 methods 전달
    <FormProvider {...methods}>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide pb-9">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col gap-5">
          
          {/* 일정 타이틀 입력 */}
          <div className={cn(itemsStyle)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "제목은 필수입니다" }}
              render={({ field }) => (
                <EventTextInput
                  placeholder="일정을 입력하세요"
                  disabled={false}
                  {...field}
                />
              )}
            />
          </div>

          {/* 날짜/시간 */}
          <div className={itemsStyle}>
            <DateSelector />
          </div>

          {/* 반복 */}
          <div className={itemsStyle}>
            <Controller
              name="repeatCycle"
              control={control}
              render={({ field }) => (
                <RepeatPicker
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* 색상 */}
          <div className={itemsStyle}>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorPicker 
                  value={field.value} 
                  onChange={field.onChange} 
                />
              )}
            />
          </div>

          {/* 위치 및 메모 */}
          <div className={itemsStyle}>
            <div className="flex flex-col">
              <Controller
                name="locate"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    className="border-none yoteyo-m-detail-lg rounded-b-none"
                    rows={10}
                    placeholder="위치"
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(() => {
                        scrollContainerRef.current?.scrollTo({
                          top: scrollContainerRef.current.scrollHeight,
                          behavior: 'smooth',
                        });
                      }, 0);
                    }}
                  />
                )}
              />

              <Controller
                name="memo"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    className="border-none yoteyo-m-detail-lg rounded-t-none"
                    rows={10}
                    placeholder="메모"
                    onFocus={(e) => {
                      field.onChange(e);
                      setTimeout(() => {
                        scrollContainerRef.current?.scrollTo({
                          top: scrollContainerRef.current.scrollHeight,
                          behavior: 'smooth',
                        });
                      }, 0);
                    }}
                  />
                )}
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="w-full h-10 flex flex-row justify-end gap-2 mt-6">
            <DrawerClose asChild>
              <Button type="button" className="w-[105px] h-10" variant="outline">
                <Text variant="body3">취소</Text>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button type="submit" className="w-[105px] h-10" variant="default">
                <Text variant="body3">저장</Text>
              </Button>
            </DrawerClose>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
