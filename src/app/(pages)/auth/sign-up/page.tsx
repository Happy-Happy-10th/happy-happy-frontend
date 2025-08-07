'use client';

import { TERMS } from '@/@mock';
import { useSignUp } from '@/api';
import {
  Box,
  Button,
  Checkbox,
  CloseIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Icon,
  Input,
  Text,
} from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {}

function Page() {
  const {
    trigger,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      nickname: '',
      userid: '',
      username: '',
      password: '',
      passwordCheck: '',
      privacyAgreement: false,
      passwordConfirmed: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async () => {
    const isSuccess = await trigger(['username', 'nickname', 'userid', 'password', 'passwordCheck']);
    if (isSuccess) {
      mutate({
        username: getValues('username'),
        nickname: getValues('nickname').length ? getValues('nickname') : getValues('username'),
        userid: getValues('userid'),
        password: getValues('password'),
        passwordCheck: getValues('passwordCheck'),
        passwordConfirmed: true,
        privacyAgreement: true,
      });
      // mutate({
      //   userid: getValues('userid'),
      //   password: getValues('password'),
      // });
    }
  };

  const { mutate } = useSignUp({
    onSuccess: data => {
      console.log(data);
      // setUser(data.memberInfo);
      // setCookie('yt-atk', data.accessToken, { path: '/' });
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <AuthLayout>
      <Box className="w-full h-14 justify-center items-center relative">
        <Button size="icon" variant="icon" className="absolute left-5 w-6 h-6 rounded-none">
          <img src="/images/arrow-left.png" className="w-2 h-4" alt="뒤로가기 아이콘" />
        </Button>

        <Text variant="title3">회원가입</Text>
      </Box>

      <Box className="flex-col px-5 mt-6 gap-y-6.5">
        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이름</Label>
          <Box className="flex-col gap-y-2">
            <Input
              {...register('username', {
                required: '이름을 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              onBlur={() => trigger('username')}
              placeholder="이름을 입력해주세요"
              variant={errors.username?.message ? 'error' : 'default'}
            />
            {errors.username?.message && (
              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.username?.message}
              </Text>
            )}
            {/* <Text variant="detail2" className="text-yoteyo-gray-200">
              * 한글은 10자, 영문은 20자 이내로 입력해 주세요
            </Text> */}
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이메일</Label>
          <Box className="flex-col gap-y-2">
            <Input
              {...register('userid', {
                required: '이메일을 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              onBlur={() => trigger('userid')}
              placeholder="이메일을 입력해주세요"
              variant={errors.userid?.message ? 'error' : 'default'}
            />

            {errors.userid?.message && (
              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.userid?.message}
              </Text>
            )}
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>비밀번호</Label>
          <Box className="flex-col gap-y-2">
            <Input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              onBlur={() => trigger('password')}
              placeholder="비밀번호를 입력해주세요"
              variant={errors.password?.message ? 'error' : 'default'}
              type="password"
            />
            {errors.password?.message && (
              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.password?.message}
              </Text>
            )}
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>비밀번호 확인</Label>
          <Box className="flex-col gap-y-2">
            <Input
              {...register('passwordCheck', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
              })}
              onBlur={() => trigger('passwordCheck')}
              placeholder="비밀번호를 입력해주세요"
              variant={errors.passwordCheck?.message ? 'error' : 'default'}
              type="password"
            />
            {errors.passwordCheck?.message && (
              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.passwordCheck?.message}
              </Text>
            )}
          </Box>
        </Box>
      </Box>

      <Box className="flex-col mt-15 px-5 pb-12">
        <Box className="justify-between px-2">
          <Box className="gap-x-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">개인정보 수집 및 이용 동의(필수)</Label>
          </Box>
          <Dialog>
            <DialogTrigger>
              <Text variant="detail1" className="text-[#aaaaaa] underline">
                내용보기
              </Text>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="h-[80%] md:h-165 overflow-auto">
              <DialogTitle hidden />

              <Box className="justify-between">
                <Text>개인정보 처리방침</Text>
                <DialogClose>
                  <Icon>
                    <CloseIcon />
                  </Icon>
                </DialogClose>
              </Box>
              <Box className="whitespace-pre-wrap overflow-auto" dangerouslySetInnerHTML={{ __html: TERMS }}></Box>
            </DialogContent>
          </Dialog>
        </Box>
        <Button className="mt-4" onClick={onSubmit}>
          가입완료
        </Button>
      </Box>
    </AuthLayout>
  );
}

export default Page;
