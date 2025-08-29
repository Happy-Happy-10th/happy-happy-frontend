import { cn } from '@/utils/tailwind-utils';
import { Text } from '@/components/base';
import { FeedEventList } from '../features';

export default function FeedPage() {
  return (
    <div
      className={cn(
        'xl:h-full w-hull flex xl:flex-row flex-col gap-5 xl:p-7.5 p-5 bg-yoteyo-bg-default h-full xl:overflow-hidden overflow-scroll',
      )}
    >
      <div className="flex flex-col xl:gap-5 gap-3">
        {/* 웰컴 문구 */}
        <div className="xl:w-123 w-full xl:h-17 h-20 bg-yoteyo-main rounded-t-[8px] rounded-r-[8px] flex shrink-0 items-center justify-center pl-5 shadow-[var(--shadow-box)]">
          <Text className="text-white xl:w-full w-[70%] flex justify-center" variant={'body1'}>
            요때요 맞춤 특별한 일정을 지금 바로 확인해보세요!
          </Text>
        </div>
        {/* 오늘 일정 부분 */}
        <div className="xl:w-177 xl:h-[calc(100vh-180px)] w-full h-150 xl:p-6 p-5 bg-white rounded-[8px] flex flex-col justify-between shadow-[var(--shadow-box)]">
          <Text variant={'title2'}>오늘 일정</Text>
          <div className="w-full flex-1 min-h-0 overflow-auto">
            <div className="w-full">
              {/* 일정 배열 받으면 보여줄 컴포넌트 추가 */}
              <div className="w-full">
                <FeedEventList key={'today'} noneEventMessage="등록된 오늘 일정이 없습니다" viewTargetEvent="today" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 다가오는 일정 리스트 */}
      <div className="xl:w-123 xl:h-full h-150 w-full bg-white rounded-[8px] p-6 shadow-[var(--shadow-box)]">
        <div className="flex flex-row justify-between items-center">
          <Text variant={'title2'}>다가오는 일정</Text>
        </div>
        <div className="flex w-full xl:xl:h-[calc(100vh-180px)] h-full xl:mt-5 mt-3">
          <div className="w-full">
            <FeedEventList
              key={'comming'}
              noneEventMessage="앞으로 등록된 일정이 없습니다"
              viewTargetEvent="upcomming"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
