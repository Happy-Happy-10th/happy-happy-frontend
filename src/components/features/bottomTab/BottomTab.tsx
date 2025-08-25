import clsx from 'clsx';
import Link from 'next/link';
import {
  Icon,
  HomeActiveIcon,
  HomeInActiveIcon,
  FeedActiveIcon,
  FeedInActiveIcon,
  YoteyoChatIcon,
} from '@/components/base';
import ActiveLink from './ui/ActiveLink';
import { cn } from '@/utils/tailwind-utils';

const navigatorFrame = clsx(
  'relative w-full h-[60px]',
  'bg-white flex justify-center items-center overflow-visible',
  'shadow-[0_-4px_8px_rgba(0,0,0,0.08)]',
  'pl-[20px] pr-[20px] z-9',
);

const navigatorMain = clsx('max-w-[600px] flex flex-row justify-between items-center flex-1 px-12 relative z-10');

const navItem = clsx('flex flex-col items-center text-gray-400 text-sm');

// 버튼 래퍼
const centerButtonWrapper = clsx(
  'absolute -top-[11px] z-10',
  'w-[62px] h-[62px] rounded-full bg-white flex items-center justify-center',
  'shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
  'relative overflow-visible',
);

const centerButton = clsx(
  'w-12 h-12 rounded-full ',
  'flex items-center justify-center',
  'transition-transform',
  'hover:cursor-pointer',
);

export default function BottomTab() {
  return (
    <div className={navigatorFrame}>
      <div className={navigatorMain}>
        <div className={navItem}>
          <ActiveLink navKey="home" activeSvg={<HomeActiveIcon />} inActiveSvg={<HomeInActiveIcon />} />
        </div>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[16px]',
            'z-[7] flex items-center justify-center',
            'w-[75px] h-[75px]',
            'overflow-hidden rounded-[9999px]', //세미 라운드
          )}
        >
          <div className={cn('w-[62px] h-[62px] rounded-full bg-white', 'shadow-[0_-4px_8px_rgba(0,0,0,0.08)]')} />
        </div>
        <div className={cn(centerButtonWrapper)}>
          <Link href={'/chat'}>
            <div className={centerButton}>
              <Icon className="w-17 h-17">
                <YoteyoChatIcon />
              </Icon>
            </div>
          </Link>
        </div>
        <div className={navItem}>
          <ActiveLink navKey="feed" activeSvg={<FeedActiveIcon />} inActiveSvg={<FeedInActiveIcon />} />
        </div>
      </div>
    </div>
  );
}
