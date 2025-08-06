'use client';

import clsx from 'clsx';
import { cn } from '@/utils/tailwind-utils';
import { RepeatType } from '@/@types';

const repeatPickerFrame = clsx(
  'w-full h-27 pt-5 pb-5 pl-4 pr-4',
  'yoteyo-m-title-main-sm'
);

const buttonStyle = clsx(
  'w-12 h-8 yoteyo-m-body-lg',
  'border-1 border-soild border-yoteyo-gray-100 rounded-[8px]',
  'flex justify-center items-center',
  'hover:cursor-pointer'
);

type PropsType = {
  value?: RepeatType;
  onChange?: (value: RepeatType) => void;
};

export default function RepeatPicker({ value, onChange }: PropsType) {
  const handleSelected = (selected: RepeatType) => {
    if (!onChange) return; 
    onChange(value === selected ? null : selected);
  };

  const options: RepeatType[] = ['day', 'week', 'month', 'year'];

  return (
    <div className={repeatPickerFrame}>
      <span>일정 반복</span>
      <div className="flex flex-row gap-4 mt-[18px]">
        {options.map((option) => (
          <div
            key={option}
            className={cn(
              buttonStyle,
              value === option && 'bg-yoteyo-main text-white'
            )}
            onClick={() => handleSelected(option)}
          >
            {option === 'day'
              ? '일'
              : option === 'week'
              ? '주'
              : option === 'month'
              ? '월'
              : '년'}
          </div>
        ))}
      </div>
    </div>
  );
}
