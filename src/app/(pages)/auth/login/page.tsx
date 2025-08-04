'use client';

import { useSignIn } from '@/api/service/auth';
import { Button } from '@/components/base';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

interface Props {}

function Page(props: Props) {
  const [payload, setPayload] = useState({
    username: 'yottaeyo',
    password: '1234',
  });

  const { mutate } = useSignIn({
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <>
      <Input value={payload.username} readOnly />
      <Input value={payload.password} readOnly />
      <Button
        onClick={() => {
          mutate({ ...payload });
        }}
      >
        로그인
      </Button>
    </>
  );
}

export default Page;
