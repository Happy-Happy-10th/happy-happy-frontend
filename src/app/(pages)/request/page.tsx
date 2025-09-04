'use client';

import { Box, Button, Text } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

interface Props {}

function Page(props: Props) {
  const {} = props;

  const { mutate } = useMutation({
    mutationKey: [''],
    mutationFn: async () => {
      await fetch('https://jsonplaceholder.typicode.com/todos/1');
    },
  });

  const { mutate: apiRouteMutate } = useMutation({
    mutationKey: [''],
    mutationFn: async () => {
      await fetch('/api/health');
    },
  });

  return (
    <AuthLayout>
      <Box className="flex flex-col gap-y-4 h-full">
        <Button onClick={() => mutate()}>jsonplaceholder 테스트</Button>
        <Button onClick={() => apiRouteMutate()}>API ROUTE 테스트</Button>
      </Box>
    </AuthLayout>
  );
}

export default Page;
