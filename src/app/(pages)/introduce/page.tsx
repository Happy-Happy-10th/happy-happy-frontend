'use client';

import { Box, Button, Text } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useRouter } from 'next/navigation';
import React from 'react';

function Page() {
  const router = useRouter();

  return (
    <AuthLayout>
      <Box className="w-full flex-col px-5 items-center">
        <Box className="w-full mt-7 bg-amber-400 h-[466px]" />

        <Text variant="title2" className="font-semibold mt-4">
          당신만의 AI 캘린더 비서 요때요
        </Text>
        <Text variant="body2" className="text-yoteyo-gray-400 mt-2.5">
          일정 예측부터 자동 등록까지 한번에!
        </Text>

        <Box className="flex-col justify-center mt-4 w-full gap-y-4">
          <Button variant="outline">
            <Text variant="title4">요때요 체험하기</Text>
          </Button>
          <Button onClick={() => router.push('/auth/login')}>
            <Text variant="title4">로그인하고 시작하기</Text>
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default Page;
