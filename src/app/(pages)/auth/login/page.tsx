'use client';

import { useSignIn } from '@/api/service/auth';
import { Box, Button, Text } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
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
    <AuthLayout>
      <Box className="flex-col items-center justify-center h-full">
        <img className="w-40" src="/images/yoteyo-text-primary.png" alt="요때요 텍스트 이미지" />

        <Box className="flex-col">
          <Text>아이디</Text>
          <Input value={payload.username} readOnly />
        </Box>

        <Box className="flex-col">
          <Text>비밀번호</Text>
          <Input value={payload.password} readOnly />
        </Box>
        <Button
          onClick={() => {
            mutate({ ...payload });
          }}
        >
          로그인
        </Button>
      </Box>
    </AuthLayout>
  );
}

export default Page;
