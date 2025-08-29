import { ApiTimeFormayType, ApiWeekStartDayType, TimeFormatEnum, WeekStartDayEnum } from '@/@types';
import { queryKeys, userSettingsService } from '@/api';
import { Box, Button, Text } from '@/components/base';
import { Separator } from '@/components/ui/separator';
import { useAuthStore, useUserSettingStore } from '@/store';
import { cn } from '@/utils/tailwind-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStore } from 'zustand';

type PropsType = {
  weekStartDay: WeekStartDayEnum;
  timeFormat: TimeFormatEnum;
};
export default function CalendarSettingForm({ weekStartDay = 'MONDAY', timeFormat = 'TWELVE_HOUR' }: PropsType) {
  const { user } = useStore(useAuthStore);
  const { settings, setUserSetting } = useStore(useUserSettingStore);
  if (!settings) return '설정을 가져오는 중.';

  const queryClient = useQueryClient();
  //주 시작일 설정
  const patchWeekStartDay = useMutation({
    mutationFn: ({ calendarId, payload }: { calendarId: number; payload: ApiWeekStartDayType }) =>
      userSettingsService.patchUserWeekStartDay(calendarId, payload),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.userSettings().queryKey,
      });
      const updatedWeekStartDay = variables.payload.weekStartDay;

      setUserSetting({
        ...settings,
        weekStartDay: updatedWeekStartDay,
      });
    },
  });

  const handleChangeWeekStartDay = (startDay: WeekStartDayEnum) => {
    if (!user) {
      console.error('Calendar Id가 존재하지 않습니다.');
      return;
    }
    const payload = { weekStartDay: startDay };
    patchWeekStartDay.mutate({ calendarId: user?.calendarId, payload: payload });
  };

  //시간대 변경
  const patchUserTimeFormat = useMutation({
    mutationFn: ({ calendarId, payload }: { calendarId: number; payload: ApiTimeFormayType }) =>
      userSettingsService.patchUserTimeFormat(calendarId, payload),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.userSettings().queryKey,
      });
      const updateTimeFormat = variables.payload.timeFormat;
      setUserSetting({
        ...settings,
        timeFormat: updateTimeFormat,
      });
    },
  });

  const handleChangeTimeFormay = (timeFormat: TimeFormatEnum) => {
    if (!user) {
      console.error('Calendar Id가 존재하지 않습니다.');
      return;
    }
    const payload = { timeFormat: timeFormat };
    patchUserTimeFormat.mutate({ calendarId: user?.calendarId, payload: payload });
  };

  return (
    <Box className="w-full xl:max-w-[393px] h-201 m-auto flex flex-col gap-5">
      <Box className="flex flex-col w-full">
        <Text className="text-yoteyo-gray-200 mb-2" variant={'body4'}>
          AI 캘린더 설정
        </Text>
        {/* 요일설정 부분 */}
        <Box className="flex flex-row bg-white justify-between items-center w-[354px] h-[50px] pl-3 pr-3 rounded-[8px]">
          <Text variant={'body3'}>주 요일 선택</Text>
          <Box className="flex gap-2">
            <Button
              className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black"
              variant={'default'}
              onClick={() => handleChangeWeekStartDay('MONDAY')}
            >
              <Text className={cn(settings.weekStartDay === 'MONDAY' && 'text-yoteyo-main')} variant={'body3'}>
                월요일
              </Text>
            </Button>
            <Button
              className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black"
              variant={'default'}
              onClick={() => handleChangeWeekStartDay('SUNDAY')}
            >
              <Text className={cn(settings.weekStartDay === 'SUNDAY' && 'text-yoteyo-main')} variant={'body3'}>
                일요일
              </Text>
            </Button>
          </Box>
        </Box>

        {/* 시간 형식 설정 */}
        <Box className="flex flex-row bg-white w-[354px] h-[100px] pl-3 pr-3 mt-3 rounded-[8px]">
          <Box className="flex flex-col h-full w-full">
            <Box className="h-[50px] flex items-center justify-between">
              <Text variant={'body3'}>시간 형식</Text>
              <Box className="flex gap-2">
                <Button
                  className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black"
                  variant={'default'}
                  onClick={() => handleChangeTimeFormay('TWELVE_HOUR')}
                >
                  <Text className={cn(settings.timeFormat === 'TWELVE_HOUR' && 'text-yoteyo-main')} variant={'body3'}>
                    12시간제
                  </Text>
                </Button>
                <Button
                  className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black"
                  variant={'default'}
                  onClick={() => handleChangeTimeFormay('TWENTY_FOUR_HOUR')}
                >
                  <Text
                    className={cn(settings.timeFormat === 'TWENTY_FOUR_HOUR' && 'text-yoteyo-main')}
                    variant={'body3'}
                  >
                    24시간제
                  </Text>
                </Button>
              </Box>
            </Box>
            <Separator />
            <Box className="h-[50px] flex items-center justify-between">
              <Text variant={'body3'}>시간 예시</Text>
              <Box className="bg-yoteyo-gray-200 w-[170] h-9 flex justify-center items-center rounded-[8px]">
                <Text variant={'body3'}>{settings.timeFormat === 'TWELVE_HOUR' ? 'PM 11:00' : 'PM 23:00'}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* 검색 위치 설정 */}
      <Box className="flex flex-col w-full">
        <Text className="text-yoteyo-gray-200" variant={'body4'}>
          AI 검색 위치 설정
        </Text>
        <Box className="flex flex-row bg-white justify-between items-center w-[354px] h-[50px] pl-3 pr-3 rounded-[8px]">
          <Text variant={'body3'}>위치</Text>
          <Box className="flex gap-2">
            <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
              <Text variant={'body3'}>서울특별시</Text>
            </Button>
            <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
              <Text variant={'body3'}>강남구</Text>
            </Button>
          </Box>
        </Box>
      </Box>
      {/* 약관 */}
      <Box className="flex flex-col w-full">
        <Text className="text-yoteyo-gray-200" variant={'body4'}>
          서비스 운영 방침
        </Text>
        <Box className="flex flex-row bg-white justify-between items-center w-[354px] h-[100px] pl-3 pr-3 rounded-[8px]">
          <Box className="flex flex-col h-full w-full">
            <Box className="h-[50px] flex items-center justify-between">
              <Text variant={'body3'}>사이트 정보A</Text>
              <Button className="bg-yoteyo-gray-200 text-balck w-[170] h-9 flex justify-center items-center rounded-[8px]">
                <Text variant={'body3'}>이용약관</Text>
              </Button>
            </Box>
            <Separator />
            <Box className="h-[50px] flex items-center justify-between">
              <Text variant={'body3'}>사이트 정보B</Text>
              <Button className="bg-yoteyo-gray-200 text-balck w-[170] h-9 flex justify-center items-center rounded-[8px]">
                <Text variant={'body3'}>개인 정보처리 방침</Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
