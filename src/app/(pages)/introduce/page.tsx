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
        <img
          src="/images/introduce.png"
          alt="인트로 이미지"
          className="w-full mt-7 max-h-[320px] md:max-h-[466px] object-contain"
        />

        <Text variant="title2" className="font-semibold mt-5">
          당신만의 AI 캘린더 비서 요때요
        </Text>
        <Text variant="body2" className="text-yoteyo-gray-400 mt-2.5">
          일정 예측부터 자동 등록까지 한번에!
        </Text>

        <Box className="flex-col justify-center mt-4 w-full gap-y-4">
          <Button variant="outline" onClick={() => router.push('/home')}>
            요때요 체험하기
          </Button>
          <Button onClick={() => router.push('/auth/login')}>로그인하고 시작하기</Button>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default Page;
