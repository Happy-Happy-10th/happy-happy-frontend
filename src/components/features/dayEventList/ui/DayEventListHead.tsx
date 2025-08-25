'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import { useAuthStore } from '@/store';

import clsx from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CustomDrawer } from '@/components/base/CustomDrawer';
import { UserEventForm } from '@/components/features/Form/';

import { CustomDialog } from '../../CustomDialog';
import { AlertPurpleIcon } from '@/components/base';

const head = clsx('mb-[20px] pt-6 pb-5', 'w-full h-[24px]', 'flex flex-row justify-between');

type props = { date: Date };
export default function DayEventListHead({ date = new Date() }: props) {
  //로그인 체크
  const { user } = useStore(useAuthStore);
  const router = useRouter();
  const [inLoginAlert, setInLoginAlert] = useState<boolean>(false);
  const handleDialogOpen = () => setInLoginAlert(true);
  const handleDialogClose = () => {
    setInLoginAlert(false);
  };
  const pageMove = () => {
    router.push('/auth/login');
  };

  const day = format(date, 'EEEE,dd', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭
  return (
    <div className={head}>
      <span className="font-bold text-[22px]">{day}</span>
      {user !== null ? (
        <CustomDrawer
          trigger={
            <Button type="button" className="rounded-[50px] bg-[#C0C0C0] w-[24px] h-[24px]">
              <Plus size={24} />
            </Button>
          }
          contents={<UserEventForm />}
          type="create"
        />
      ) : (
        <Button
          type="button"
          className="rounded-[50px] bg-[#C0C0C0] w-[24px] h-[24px] hover:cursor-pointer"
          onClick={handleDialogOpen}
        >
          <Plus size={24} />
        </Button>
      )}
      <CustomDialog
        open={inLoginAlert}
        onClose={handleDialogClose}
        onSubmit={pageMove}
        icon={<AlertPurpleIcon />}
        mainMsg="앗 아직 로그인을 안하셨군요"
        subMsg="로그인하고 요때요 서비스를 사용해보세요"
        btntext="로그인"
      />
    </div>
  );
}
