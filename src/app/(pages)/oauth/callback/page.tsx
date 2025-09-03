'use client';
import React, { useEffect, useState } from 'react';
import { useQueryState, parseAsString, parseAsBoolean, useQueryStates } from 'nuqs';
import { useRouter } from 'next/navigation';
import { AlertRedIcon } from '@/components/base';
import { CustomDialog } from '@/components/features';
import { useMyInfo } from '@/api';

interface Props {}

function Page() {
  const router = useRouter();

  const [dialogState, setDialogState] = useState({ open: false, main: '', sub: '' });

  const [payload] = useQueryStates({
    success: parseAsBoolean.withDefault(false),
    error: parseAsString.withDefault(''),
  });
  const { refetch } = useMyInfo();

  const handle = async () => {
    const res = await refetch();
    console.log(res);
    router.push('/home');
  };

  useEffect(() => {
    if (payload.success) {
      handle();
    }
    if (payload.error === 'already_registered') {
      setDialogState({
        open: true,
        main: '이미 이메일로 가입된 계정이 있습니다.',
        sub: '기존 계정으로 로그인해 주세요.',
      });
    }
  }, [payload]);

  return (
    <>
      <CustomDialog
        open={dialogState.open}
        onClose={() => {
          setDialogState({ open: false, main: '', sub: '' });
          router.push('/auth/login');
        }}
        icon={<AlertRedIcon />}
        mainMsg={dialogState.main}
        subMsg={dialogState.sub}
        onSubmit={() => router.push('/auth/login')}
      />
    </>
  );
}

export default Page;
