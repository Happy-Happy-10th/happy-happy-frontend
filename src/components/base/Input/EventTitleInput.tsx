'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/tailwind-utils';
import { cva } from 'class-variance-authority';
import { Text } from '@/components/base';
import { ComponentProps, ReactNode, useEffect } from 'react';
import { EventColor } from '@/@types';
import { useFormContext } from 'react-hook-form';

const eventChildVariants = cva(`absolute top-0 bottom-0 left-0 w-[8px] rounded-l-md`, {
  variants: {
    variant: {
      yoteyoRed: 'bg-yoteyo-red',
      yoteyoOrange: 'bg-yoteyo-orange',
      yoteyoYellow: 'bg-yoteyo-yellow',
      yoteyoGreen: 'bg-yoteyo-green',
      yoteyoEmerald: `bg-yoteyo-emerald`,
      yoteyoSky: `bg-yoteyo-sky`,
      yoteyoBlue: `bg-yoteyo-blue`,
      yoteyoPurple: `bg-yoteyo-purple`,
      yoteyoPink: `bg-yoteyo-pink`,
      yoteyoBlack: `bg-yoteyo-black`,
      default: 'bg-yoteyo-main',
    },
  },
});

type PropsTpye = {
  placeholder?: string;
  disabled?: boolean;
  color?: EventColor;
  children?: ReactNode;
  className?: string;
} & ComponentProps<typeof Input>;
export default function EventTextInput({
  placeholder = '',
  disabled = false,
  color = 'yoteyoGreen',
  children,
  className,
  value,
  ...inputProps
}: PropsTpye) {
  const form = useFormContext();
  const variant = form?.watch?.('color') ?? color;
  return (
    <div className={cn('relative w-full h-15')}>
      <div className={cn(eventChildVariants({ variant: variant }))}></div>
      <Input
        className={cn('pl-4 h-15', className)}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}
