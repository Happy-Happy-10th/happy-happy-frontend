"use client"
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
} & ComponentProps<typeof Input>;
export default function EventTextInput({
  placeholder = '',
  disabled = false,
  color = 'yoteyoGreen',
  children,
  className,
  ...inputProps
}: PropsTpye) {
  const form = useFormContext();
  const variant = form?.watch?.("color") ?? color;
  return (
    <div className={cn('relative w-full h-15')}>
      <div className={cn(eventChildVariants({ variant: variant}))}></div>
      <Input
        placeholder={placeholder}
        disabled={disabled}
        className={cn('pl-4 h-15 text-black opacity-100 disabled:opacity-100 disabled:text-black', className)}
        {...inputProps}
      />
      {children && (
        <div className="absolute inset-0 pl-4 flex items-center pointer-events-none text-black">
          <Text variant={'body3'}>{children}</Text>
        </div>
      )}
    </div>
  );
}
