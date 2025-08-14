'use client';

import { CHAT, SIDO } from '@/@mock/chat';
import { AlertCheckIcon, AlertRedIcon, Box, Button, ChatBox, Icon, Text } from '@/components/base';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store';
import { cn } from '@/utils/tailwind-utils';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useStore } from 'zustand/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { usePostAIEvent, usePostAIMessage } from '@/api/service/chat';
import { useRouter } from 'next/navigation';
import { APIMessage, Message } from '@/@types';
import { CustomDialog } from '@/components/features';
import { ChatButton, ChatSelect, ChatHeader } from './_components';
import { convertChatMessage } from '@/utils';

dayjs.locale('ko');

export default function Page() {
  const { user } = useStore(useAuthStore);
  const router = useRouter();

  const [firstTime] = useState(new Date());
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialogState, setDialogState] = useState<{ open: boolean; message: string; type: 'error' | 'success' }>({
    open: false,
    message: '',
    type: 'success',
  });
  const [payload, setPayload] = useState<{ eventType: 'online' | 'offline' | ''; title: string; address: string }>({
    eventType: '',
    title: '',
    address: '',
  });

  const handleClick = (payload: APIMessage) => {
    postEventMutate({
      ...payload,
      calendarId: user?.calendarId ?? 0,
    });
  };

  const { mutate: postEventMutate } = usePostAIEvent({
    onSuccess: data => {
      setDialogState({
        open: true,
        message: data.data,
        type: 'success',
      });
    },
    onError: async data => {
      const error = await data.response.json();
      setDialogState({
        open: true,
        message: error.message,
        type: 'error',
      });
    },
  });

  const { mutate, isPending } = usePostAIMessage({
    onSuccess: data => {
      if (data.status === 200) {
        const { data: res } = data;

        const target = res.list[0];

        setMessages(prev => [
          ...prev,
          convertChatMessage({ message: target, timeStamp: data.timeStamp }),
          {
            from: 'AI',
            render: (
              <Button className="w-[140px] font-normal" onClick={() => handleClick(target)}>
                일정 바로 등록
              </Button>
            ),
          },
        ]);
      }
    },
    onError: async data => {
      const error = await data.response.json();
      console.log(error.data);

      setMessages(prev => [
        ...prev,
        {
          from: 'AI',
          value: error.data,
          date: new Date(error.timeStamp),
        },
      ]);
    },
  });

  // const [isPending, setIsPending] = useState(false);

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

  const chatVisible = useMemo(() => {
    if (payload.eventType === 'offline') {
      return payload.eventType && payload.address;
    }
    if (payload.eventType === 'online') {
      return true;
    }

    return false;
  }, [payload]);

  const handleSubmit = async () => {
    if (isPending) return;
    setMessages(prev => [
      ...prev,
      {
        from: 'USER',
        date: new Date(),
        value: payload.title,
      },
    ]);

    mutate({
      parameters: {
        ...payload,
      },
    });
    setPayload(prev => ({ ...prev, title: '' }));
  };

  return (
    <>
      <CustomDialog
        open={dialogState.open}
        onSubmit={() => {
          if (dialogState.message === '로그인이 필요합니다.') {
            router.push('/auth/login');
          }
        }}
        onClose={() => setDialogState({ open: false, message: '', type: 'success' })}
        icon={dialogState.type === 'success' ? <AlertCheckIcon /> : <AlertRedIcon />}
        mainMsg={dialogState.message}
      />

      <Box className="w-full h-full flex-col bg-linear-[180deg,#FFFFFF_0%,#F5EBFF_100%]">
        <Box className="z-10 fixed top-0 h-21.5 w-full px-5 items-center gap-x-4 bg-white">
          <Button size="icon" variant="icon" className="rounded-none" onClick={() => router.back()}>
            <img src="/images/arrow-left-black.png" className="w-2 h-4" alt="뒤로가기 아이콘" />
          </Button>

          <Box className="items-center gap-x-4">
            <Icon className="w-10.5 h-10.5 rounded-full relative">
              <img className="object-contain" src="/images/chat-profile.png" alt="요때요 아이콘" />
              <Box className="w-2 h-2 bg-[#58F46D] absolute bottom-0 right-0 rounded-full" />
            </Icon>
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
                <Icon className="w-9 h-9 rounded-full">
                  <img className="object-contain" src="/images/chat-profile.png" alt="요때요 아이콘" />
                </Icon>
                <Text className="text-yoteyo-gray-300 !text-[12px] font-medium">
                  {dayjs(firstTime).format('A h:mm')}
                </Text>
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
                  <ChatButton
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
                  </ChatButton>
                  <ChatButton
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
                          <ChatSelect
                            onValueChange={value => {
                              setPayload(prev => ({ ...prev, address: value }));
                              setMessages(prev => [...prev, { from: 'USER', value }]);
                              handlePostAIMessage({ message: CHAT.step3.offline[0], date: new Date() });
                              handlePostAIMessage({ message: CHAT.step3.offline[1], date: new Date() });
                            }}
                          />
                        ),
                      });
                    }}
                    isSelect={payload.eventType === 'offline'}
                  >
                    <Text variant="body2">오프라인</Text>
                  </ChatButton>
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
                    {item.date && <ChatHeader date={item.date} from={item.from} />}

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

          {isPending ? (
            <Box className="gap-x-3 mt-3 items-center">
              <Icon className="w-6 h-6 text-yoteyo-main">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin lucide lucide-loader-circle-icon lucide-loader-circle"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </Icon>

              <Text variant="body2">잠시만 기다려주세요...</Text>
            </Box>
          ) : (
            <></>
          )}
        </Box>

        {chatVisible ? (
          <Box className="py-3 bg-white w-full mt-auto px-5  gap-x-5 ">
            <input
              className="w-full h-auto bg-[#F0F0F0] outline-0 rounded-full px-5"
              placeholder="메세지 입력"
              value={payload.title}
              onChange={e => setPayload(prev => ({ ...prev, title: e.target.value }))}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />

            <Button
              variant="icon"
              size="icon"
              disabled={isPending}
              onClick={() => {
                handleSubmit();
              }}
            >
              <Icon className="flex items-center justify-center w-14 h-14 rounded-full bg-yoteyo-main">
                <img className="w-6 h-6" src="/images/send-icon.png" alt="전송" />
              </Icon>
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
