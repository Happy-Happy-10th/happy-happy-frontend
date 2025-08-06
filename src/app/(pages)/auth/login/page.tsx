'use client';

import { useSignIn } from '@/api/service/auth';
import { Box, Button, Icon, Input, Text } from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Page() {
  const router = useRouter();

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      userid: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async () => {
    const isSuccess = await trigger(['userid', 'password']);
    if (isSuccess) {
      mutate({
        userid: getValues('userid'),
        password: getValues('password'),
      });
    }
  };

  const { mutate } = useSignIn({
    onSuccess: data => {
      console.log(data);
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <AuthLayout>
      <Box className="flex-col items-center justify-center h-full px-5">
        <img className="w-40 h-15" src="/images/yoteyo-text-primary.png" alt="요때요 텍스트 이미지" />

        <Box className="flex-col w-full gap-y-3">
          <Label htmlFor="id" className="text-sm/[1.5] font-medium p-1">
            아이디
          </Label>
          <Box className="flex-col">
            <Input
              id="id"
              {...register('userid', {
                required: '이메일을 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              placeholder="이메일을 입력해주세요"
              onBlur={() => trigger('userid')}
              variant={errors.userid?.message ? 'error' : 'default'}
            />

            <Text variant="detail2" className="text-yoteyo-error p-1">
              {errors.userid?.message}
            </Text>
          </Box>
        </Box>

        <Box className="flex-col w-full gap-y-3 mt-6">
          <Label htmlFor="pw" className="text-sm/[1.5] font-medium p-1">
            비밀번호
          </Label>
          <Box className="flex-col">
            <Input
              id="pw"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onBlur={() => trigger('password')}
              variant={errors.password?.message ? 'error' : 'default'}
            />
            <Text variant="detail2" className="text-yoteyo-error p-1">
              {errors.password?.message}
            </Text>
          </Box>
        </Box>

        <Box className="w-full justify-end mt-6">
          <Button size="icon" variant="icon" onClick={() => router.push('/auth/sign-up')}>
            <Text variant="detail1" className="text-yoteyo-main">
              회원가입
            </Text>
          </Button>
        </Box>

        <Button className="mt-12" onClick={onSubmit}>
          로그인
        </Button>

        <Box className="mt-12.5 mb-6 w-full items-center">
          <Box className="flex-1 w-full h-[1px] bg-yoteyo-outline" />
          <Text variant="detail1" className="mx-4 text-yoteyo-gray-400">
            SNS 간편 로그인
          </Text>
          <Box className=" flex-1 w-full h-[1px] bg-yoteyo-outline" />
        </Box>

        <Box className="gap-x-5">
          <Box className="flex-col">
            <Button size="icon" variant="icon">
              <Icon className="w-15 h-15 border-1 border-yoteyo-outline rounded-full">
                <img className="w-8 h-8" src="/images/google.png" alt="" />
              </Icon>
            </Button>

            <Text variant="detail1" className="text-center text-gray-400 mt-2.5">
              구글
            </Text>
          </Box>

          <Box className="flex-col">
            <Button size="icon" variant="icon">
              <Icon className="w-15 h-15 bg-[#FAE100] rounded-full">
                <img className="w-8 h-8" src="/images/kakao.png" alt="" />
              </Icon>
            </Button>

            <Text variant="detail1" className="text-center text-gray-400 mt-2.5">
              카카오톡
            </Text>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default Page;
