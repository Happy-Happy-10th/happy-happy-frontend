'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/utils/tailwind-utils';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { DatePicker, TimePicker } from '@/components/base';
import { Text } from '@/components/base';

const dateBox = clsx(
  'flex justify-center items-center',
  'bg-yoteyo-gray-400 font-yoteyo-p-body-lg rounded-md',
  'hover:cursor-pointer hover:text-yoteyo-main',
  'w-[107px] h-9 xl:h-8',
);

type PropsType = {
  targetDateName: string;
  targetDateValue?: Date;
  targetDateSetFn: (date: Date) => void;
  allDayChecked: boolean;
};

type AccodianType = 'date-pick' | 'time-pick' | null;

export default function SetDate({
  targetDateName,
  targetDateValue = new Date(),
  allDayChecked,
  targetDateSetFn,
}: PropsType) {
  const [accodianType, setAccodianType] = useState<AccodianType>(null);

  const handleAccodian = (inputAccodianType: AccodianType) => {
    setAccodianType(prev => (prev === inputAccodianType ? null : inputAccodianType));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between">
        <span className="yoteyo-m-detail-lg flex items-center justify-center">
          <Text variant={'body4'}>{targetDateName}</Text>
        </span>
        <div className="flex flex-row gap-1">
          {/* 날짜 선택 버튼 */}
          <Button
            type="button"
            className={cn(dateBox, accodianType === 'date-pick' && 'text-yoteyo-main')}
            variant="ghost"
            onClick={() => handleAccodian('date-pick')}
          >
            <Text variant={'body3'}>{format(targetDateValue, 'yyyy.MM.dd')}</Text>
          </Button>

          {/* 시간 선택 버튼 (하루종일 off일 경우에만 표시) */}
          {!allDayChecked && (
            <Button
              type="button"
              className={cn(dateBox, accodianType === 'time-pick' && 'text-yoteyo-main')}
              variant="ghost"
              onClick={() => handleAccodian('time-pick')}
            >
              <Text variant={'body3'}>{format(targetDateValue, 'a hh:mm', { locale: ko })}</Text>
            </Button>
          )}
        </div>
      </div>

      {/* 날짜/시간 피커 아코디언 */}
      <AnimatePresence>
        {accodianType && (
          <motion.div
            className="w-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Separator className="my-1" />
            <div className="w-full h-[230px]">
              {accodianType === 'date-pick' && (
                <DatePicker targetDate={targetDateValue} setTargetDate={targetDateSetFn} />
              )}
              {accodianType === 'time-pick' && (
                <TimePicker targetDate={targetDateValue} setTargetDate={targetDateSetFn} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
