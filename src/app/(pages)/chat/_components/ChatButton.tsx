import { cn } from '@/utils/tailwind-utils';
import React from 'react';

function ChatButton({ isSelect, ...props }: React.ComponentProps<'button'> & { isSelect: boolean }) {
  return (
    <button
      className={cn(
        'w-27 h-8 border-1 bg-white rounded-[8px] cursor-pointer flex justify-center items-center',
        isSelect ? 'text-yoteyo-main border-yoteyo-main' : 'text-yoteyo-gray-200 border-[#C0C0C0]',
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}

export { ChatButton };
