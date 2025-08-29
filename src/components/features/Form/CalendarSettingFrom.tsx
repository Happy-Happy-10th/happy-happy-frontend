import { TimeFormatEnum, WeekStartDayEnum } from '@/@types';
import { Box, Button, Text } from '@/components/base';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/tailwind-utils';

type PropsType = {
  weekStartDay: WeekStartDayEnum;
  timeFormat: TimeFormatEnum;
};
export default function CalendarSettingForm({ weekStartDay = 'MONDAY', timeFormat = 'TWELVE_HOUR' }: PropsType) {
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
            <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
              <Text className={cn(weekStartDay === 'MONDAY' && 'text-yoteyo-main')} variant={'body3'}>
                월요일
              </Text>
            </Button>
            <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
              <Text className={cn(weekStartDay === 'SUNDAY' && 'text-yoteyo-main')} variant={'body3'}>
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
                <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
                  <Text className={cn(weekStartDay === 'MONDAY' && 'text-yoteyo-main')} variant={'body3'}>
                    12시간제
                  </Text>
                </Button>
                <Button className="w-20 h-9 bg-yoteyo-gray-200 rounded-[8px] text-black" variant={'default'}>
                  <Text className={cn(weekStartDay === 'SUNDAY' && 'text-yoteyo-main')} variant={'body3'}>
                    24시간제
                  </Text>
                </Button>
              </Box>
            </Box>
            <Separator />
            <Box className="h-[50px] flex items-center justify-between">
              <Text variant={'body3'}>시간 예시</Text>
              <Box className="bg-yoteyo-gray-200 w-[170] h-9 flex justify-center items-center rounded-[8px]">
                <Text variant={'body3'}>{timeFormat === 'TWELVE_HOUR' ? 'PM 11:00' : 'PM 23:00'}</Text>
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
