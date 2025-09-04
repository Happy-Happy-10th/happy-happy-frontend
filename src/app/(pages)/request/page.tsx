'use client';

import { useSignIn } from '@/api';
import { Box, Button, Text } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

interface Props {}

function Page(props: Props) {
  const {} = props;

  const { mutate } = useMutation({
    mutationKey: ['jsonplaceholder'],
    mutationFn: async () => {
      await fetch('https://jsonplaceholder.typicode.com/todos/1');
    },
  });

  const { mutate: apiRouteMutate } = useMutation({
    mutationKey: ['NEXT-BFF'],
    mutationFn: async () => {
      await fetch('/api/health');
    },
  });

  const { mutate: loginMutate } = useSignIn({});

  return (
    <AuthLayout>
      <Box className="flex flex-col gap-y-4 h-full">
        <Button onClick={() => mutate()}>jsonplaceholder 테스트</Button>
        <Button onClick={() => apiRouteMutate()}>API ROUTE 테스트</Button>
        <Button
          onClick={() =>
            loginMutate({
              userid: 'kidkid',
              password: 'Qweasd123#',
            })
          }
        >
          yottaeyo 테스트
        </Button>
      </Box>
    </AuthLayout>
  );
}

export default Page;
