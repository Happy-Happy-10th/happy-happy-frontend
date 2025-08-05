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
import { format } from 'date-fns';

const itemsStyle = clsx('w-full bg-white rounded-[8px]');

type PropsType = {
  event?: CalendarEventType;
};

export default function UserEventForm({ event }: PropsType) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const methods = useForm<CalendarEventType>({
    defaultValues: event || {
      title: '',
      allDay: true,
      start: new Date(),
      end: new Date(),
      repeat: null,
      color: 'yoteyoGreen',
      locate: '',
      memo: '',
    },
  });
  const { control, handleSubmit, getValues } = methods;
  const onSubmit = (data: CalendarEventType) => {
    alert(format(data.start,"yyyy-MM-dd : HH-mm"))
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
                  color={getValues().color}
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
              name="repeat"
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
            </div>
          </div>

          {/* 버튼 */}
          <div className="w-full h-10 flex flex-row justify-end gap-2 mt-6">
            <Button type="button" className="w-[105px] h-10" variant="outline">
              <Text variant="body3">취소</Text>
            </Button>
            <Button type="submit" className="w-[105px] h-10" variant="default">
              <Text variant="body3">저장</Text>
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
