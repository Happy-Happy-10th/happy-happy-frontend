'use client';
import React from 'react';
import { Box } from './Box';
import { Text } from '../Typography';
import { cn } from '@/utils/tailwind-utils';
import { motion } from 'motion/react';

interface Props {
  message: string;
  from: 'AI' | 'USER';
}

function ChatBox({ message, from }: Props) {
  const sentenceVariants = {
    hidden: {},
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
  };

  return (
    <>
      {from === 'AI' && <Box className="w-9 mr-3" />}
      <Box className={cn('w-full', from === 'AI' ? 'justify-start' : 'justify-end my-3')}>
        <Box
          className={cn(
            'rounded-b-[8px] rounded-tr-[8px] px-4.5 py-3.5 w-fit max-w-125',
            from === 'AI' ? 'bg-[#FDE3FF]' : 'bg-yoteyo-main [&_span]:text-white',
          )}
        >
          {from === 'AI' ? (
            <motion.p key={message} variants={sentenceVariants} initial="hidden" animate="visible">
              {message.split('').map((char, i) => (
                <motion.span key={`${char}-${i}`} className="whitespace-pre-wrap" variants={letterVariants}>
                  <Text variant="body2" className="font-normal">
                    {char}
                  </Text>
                </motion.span>
              ))}
            </motion.p>
          ) : (
            <Text variant="body2" className="font-normal whitespace-pre-wrap">
              {message}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
}

export { ChatBox };
