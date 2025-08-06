'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/utils/tailwind-utils';
import { CheckIcon } from '../Icon';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'data-[state=unchecked]:[&_svg]:text-purple-500 data-[state=unchecked]:bg-white data-[state=checked]:bg-yoteyo-main data-[state=checked]:text-primary-foreground data-[state=unchecked]:border-1 data-[state=unchecked]:border-[#BEBEBE] rounded-full w-6 h-6 shrink-0 shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
