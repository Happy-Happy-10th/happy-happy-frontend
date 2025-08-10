import clsx from 'clsx';
import { ReactNode } from 'react';
import { BottomTab } from '@/components/features';

const rootFrame = clsx('w-full h-full flex flex-col', 'max-w-[1280px]', 'bg-yoteyo-gray-100 overflow-hidden');

const contentsFrame = clsx(
  'flex-1 flex',
  // "xl:p-[30px] xl:pb-[5px]",
  'overflow-hidden',
);

const contentsBody = clsx('flex-1 w-full', 'rounded-[8px] bg-white');

const navigator = clsx('w-full shrink-0');

type PropsType = { children: ReactNode; showBottomTab?: boolean };

export default function ServiceLayout({ children, showBottomTab = true }: PropsType) {
  return (
    <div className="w-dvw h-dvh flex justify-center ">
      <div className={rootFrame}>
        <div className={contentsFrame}>
          <div className={contentsBody}>{children}</div>
        </div>
        {showBottomTab && (
          <div className={navigator}>
            <BottomTab />
          </div>
        )}
      </div>
    </div>
  );
}
