import { Message } from '@/@types';
import { Box, Icon, Text } from '@/components/base';
import { cn } from '@/utils/tailwind-utils';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  date: Date;
  from: Message['from'];
}

function ChatHeader({ date, from }: Props) {
  return (
    <Box className={cn('gap-x-3 items-center mb-3', from === 'AI' ? '' : 'ml-auto')}>
      {from === 'AI' && (
        <Icon className="w-9 h-9 rounded-full">
          <img src="/images/chat-profile.png" alt="요때요 아이콘" className="object-contain" />
        </Icon>
      )}

      <Text className="text-yoteyo-gray-300 !text-[12px] font-medium">{dayjs(date).format('A h:mm')}</Text>
    </Box>
  );
}

export { ChatHeader };
