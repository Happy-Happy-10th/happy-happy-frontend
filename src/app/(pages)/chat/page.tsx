'use client';

import { CHAT, SIDO } from '@/@mock/chat';
import { Box, Button, ChatBox, Icon, Text } from '@/components/base';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store';
import { cn } from '@/utils/tailwind-utils';
import { motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from 'zustand/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useHealth } from '@/api';
import { usePostAIMessage } from '@/api/service/chat';

type Message = {
  from: 'AI' | 'USER';
  value?: string;
  render?: React.ReactNode;
  date?: Date;
};
dayjs.locale('ko');

const CustomButton = ({ isSelect, ...props }: React.ComponentProps<'button'> & { isSelect: boolean }) => {
  return (
    <button
      className={cn(
        'w-27 h-8 border-1 bg-white rounded-[8px] cursor-pointer',
        isSelect ? 'text-yoteyo-main border-yoteyo-main' : 'text-yoteyo-gray-200 border-[#C0C0C0]',
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

const CustomSelect = ({ ...props }: React.ComponentProps<typeof Select>) => {
  return (
    <Select {...props}>
      <SelectTrigger className="bg-white data-[state=open]:border-yoteyo-main ring-0 focus-visible:ring-0 focus-visible:border-none aria-invalid:border-none">
        <SelectValue placeholder="시도" />
      </SelectTrigger>

      <SelectContent className="border-none">
        {SIDO.map(item => {
          return (
            <SelectItem key={item} value={item} className="focus:bg-white focus:text-yoteyo-main cursor-pointer">
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

const AIHeader = ({ date }: { date: Date }) => {
  return (
    <Box className="gap-x-3 items-center mb-3">
      <Icon className="w-9 h-9 border rounded-full"></Icon>
      <Text>{dayjs(date).format('A h:mm')}</Text>
    </Box>
  );
};

export default function Page() {
  const { user } = useStore(useAuthStore);

  const { data } = useHealth();

  const { mutate, isPending } = usePostAIMessage({});

  const [payload, setPayload] = useState<{ eventType: 'online' | 'offline' | ''; title: string; address: string }>({
    eventType: '',
    title: '',
    address: '',
  });
  const [firstTime, setFirstTime] = useState(new Date());
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostAIMessage = ({
    ttl = 1000,
    message,
    render,
    date,
  }: {
    ttl?: number;
    date?: Date;
    message?: string;
    render?: React.ReactNode;
  }) => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: 'AI',
          value: message,
          render,
          date,
        },
      ]);
    }, ttl);
  };

  const handleSubmit = () => {
    if (isPending) return;
  };

  return (
    <Box className="w-full h-full flex-col bg-linear-[180deg,#FFFFFF_0%,#F5EBFF_100%]">
      <Box className="z-10 fixed top-0 h-21.5 w-full px-5 items-center gap-x-4 bg-white">
        <Button size="icon" variant="icon" className="rounded-none">
          <img src="/images/arrow-left-black.png" className="w-2 h-4" alt="뒤로가기 아이콘" />
        </Button>

        <Box className="items-center gap-x-4">
          <Icon className="w-10.5 h-10.5 border rounded-full"></Icon>
          <Box className="flex-col">
            <Text variant="title2" className="text-[#2C2D3A]">
              AI 비서 - 요때요
            </Text>
            <Text variant="body2" className="text-yoteyo-gray-400 ">
              당신만의 캘린더 비서
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="flex-col gap-y-2 px-5 pb-5 pt-26.5 overflow-auto">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.8 }}
        >
          <Box className="flex-col">
            <Box className="gap-x-3 items-center mb-3">
              <Icon className="w-9 h-9 border rounded-full"></Icon>
              <Text>{dayjs(firstTime).format('A h:mm')}</Text>
            </Box>

            <Box>
              <ChatBox from="AI" message={CHAT.step1[0]} />
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.8 }}
        >
          <Box className="flex-col">
            <Box>
              <ChatBox from="AI" message={CHAT.step1[1]} />
            </Box>

            <Box>
              <Box className="w-9 mr-3" />

              <Box className="gap-x-3 mt-3">
                <CustomButton
                  onClick={() => {
                    setPayload(prev => ({ ...prev, eventType: 'online' }));
                    setMessages(prev => [
                      ...prev,
                      {
                        from: 'USER',
                        time: new Date(),
                        value: '온라인',
                      },
                    ]);
                    handlePostAIMessage({ message: CHAT.step2.online[0], date: new Date() });
                  }}
                  isSelect={payload.eventType === 'online'}
                >
                  <Text variant="body2">온라인</Text>
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    setPayload(prev => ({ ...prev, eventType: 'offline' }));
                    setMessages(prev => [
                      ...prev,
                      {
                        from: 'USER',
                        time: new Date(),
                        value: '오프라인',
                      },
                    ]);
                    handlePostAIMessage({ message: CHAT.step2.offline[0], date: new Date() });
                    handlePostAIMessage({
                      render: (
                        <CustomSelect
                          onValueChange={value => {
                            setPayload(prev => ({ ...prev, address: value }));
                            setMessages(prev => [...prev, { from: 'USER', value }]);
                            handlePostAIMessage({ message: CHAT.step3.offline[0] });
                            handlePostAIMessage({ message: CHAT.step3.offline[1] });
                          }}
                        />
                      ),
                    });
                  }}
                  isSelect={payload.eventType === 'offline'}
                >
                  <Text variant="body2">오프라인</Text>
                </CustomButton>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {messages.map((item, idx) => {
          if (item.value)
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.8 }}
              >
                <Box className="flex-col">
                  {item.date && <AIHeader date={item.date} />}

                  <Box>
                    <ChatBox from={item.from} message={item.value} />
                  </Box>
                </Box>
              </motion.div>
            );
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.8 }}
            >
              <Box>
                <Box className="w-9 mr-3" />

                {item.render}
              </Box>
            </motion.div>
          );
        })}
      </Box>

      <Box className="py-3 bg-white w-full mt-auto px-5  gap-x-5 ">
        <input className="w-full h-auto bg-[#F0F0F0] outline-0 rounded-full resize-none" />
        <Button variant="icon" size="icon" disabled={isPending}>
          <Icon className="flex items-center justify-center w-14 h-14 rounded-full bg-yoteyo-main">
            <img className="w-6 h-6" src="/images/send-icon.png" alt="전송" />
          </Icon>
        </Button>

        {/* <Button
          onClick={() => {
            mutate({
              parameters: {
                eventType: '온라인',
                title: '스위프 개발완료기간이 궁금해',
                // title: '올리브영 세일기간이 궁금해',
                address: '',
              },
            });
          }}
        >
          한번 요청해볼게
        </Button> */}
      </Box>
    </Box>
  );
}
