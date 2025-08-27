'use client';
import {
  Box,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ShareKakaoIcon,
  ShareUrlIcon,
  Text,
} from '@/components/base';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { X } from 'lucide-react';

import { useStore } from 'zustand';
import { useAuthStore } from '@/store';
import { base64UrlEncode, copyText } from '@/utils';
import { CalendarEventType } from '@/@types';

type PropsType = {
  open: boolean;
  onClose: () => void;
  event: CalendarEventType;
};
export default function ShareEventDialog({ open, onClose, event }: PropsType) {
  // 공유하기 공통 값
  const { user } = useStore(useAuthStore);
  const SHARE_ROUTE = '/shared';
  const url = new URL(SHARE_ROUTE, window.location.origin);
  //개인필드 지우기
  const sendEvent = { ...event, id: 0, calendarId: 0 };
  const encodingEvent = base64UrlEncode(JSON.stringify(sendEvent));
  url.searchParams.set('d', encodingEvent);
  url.searchParams.set('sendUser', user!.nickname);
  const sharedURL = url.toString();

  //카카오 공유 함수
  const handleShareKakao = () => {
    alert('카카오전송 넣기');
    onClose();
  };

  // 링크 클립보드 복사 함수
  const handleShareLink = () => {
    copyText(sharedURL); // 클립보드 복사
    toast('클립보드에 복사되었습니다.', { duration: 1500 });
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className={'w-[320px] h-[208px] z-[9999]'}>
        <DialogTitle hidden />
        <DialogHeader>
          <Box className="w-full">
            <Text className="w-full flex justify-center items-center pl-6" variant={'title3'}>
              공유하기
            </Text>
            <DialogClose asChild>
              <Box className="ml-auto">
                <button type="button">
                  <X size={24} />
                </button>
              </Box>
            </DialogClose>
          </Box>
        </DialogHeader>
        <Box className="w-full flex gap-8 flex-col justify-center items-center mb-13">
          <Box className="flex justify-center items-center gap-[50px] w-43 h-[70px]">
            <button className="hover:cursor-pointer" type="button" onClick={handleShareKakao}>
              <ShareKakaoIcon />
            </button>
            <button className="hover:cursor-pointer" type="button" onClick={handleShareLink}>
              <ShareUrlIcon />
            </button>
          </Box>
        </Box>
      </DialogContent>
      <Toaster position="bottom-left" />
    </Dialog>
  );
}
