'use client';

import { TERMS } from '@/@mock';
import { useCheckUserId, useCheckUserName, useSendCode, useSignUp, useVerifyCode } from '@/api';
import {
  AlertCheckIcon,
  AlertRedIcon,
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
import { CustomDialog } from '@/components/features';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/tailwind-utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Page() {
  const [isAuthUserId, setIsAuthUserId] = useState(false);
  const [isAuthUserEmail, setIsAuthUserEmail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [code, setCode] = useState('');
  const [dialogState, setDialogState] = useState<{ open: boolean; message: string; type: 'error' | 'success' }>({
    open: false,
    message: '',
    type: 'error',
  });

  const router = useRouter();

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      nickname: '', // 이름
      userid: '', // 아이디
      username: '', // 이메일
      password: '',
      passwordCheck: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async () => {
    const isSuccess = await trigger(['username', 'nickname', 'userid', 'password', 'passwordCheck']);
    if (isSuccess) {
      mutate({
        username: getValues('username'),
        nickname: getValues('nickname'),
        userid: getValues('userid'),
        password: getValues('password'),
        passwordCheck: getValues('passwordCheck'),
        passwordConfirmed: getValues('password') === getValues('passwordCheck'),
        privacyAgreement: checked,
      });
      // mutate({
      //   userid: getValues('userid'),
      //   password: getValues('password'),
      // });
    }
  };

  const { mutate } = useSignUp({
    onSuccess: data => {
      if (data.status === 200) {
        window.alert('회원가입이 완료되었습니다.');
        router.back();
        // setDialogState({
        //   open: true,
        //   message: '회원가입이 완료되었습니다.',
        //   type: 'success',
        // });
      }

      // setUser(data.memberInfo);
      // setCookie('yt-atk', data.accessToken, { path: '/' });
    },
    onError: async error => {
      const response = await error.response.json();

      const messages = response?.message.split('.,') ?? [];

      const message = messages.length ? messages[0] : '';

      if (message.length) {
        setDialogState({
          open: true,
          type: 'error',
          message,
        });
      }

      // 에러노출
      console.log(message);
      console.log('error', error);
    },
  });

  //아이디 중복확인
  const { mutate: userIdCheckMutate } = useCheckUserId({
    onSuccess: data => {
      if (data.status === 200) {
        setIsAuthUserId(true);
      }
    },
    onError: async error => {
      const response = await error.response.json();
      if (response.message) {
        setDialogState({
          open: true,
          type: 'error',
          message: response.message,
        });
      }
    },
  });

  //이메일 중복확인
  const { mutate: userNameCheckMutate } = useCheckUserName({
    onSuccess: data => {
      if (data.status === 200) {
        sendCodeMutate({
          username: getValues('username'),
        });
        setIsAuthUserEmail(true);
      }
    },
    onError: async error => {
      const response = await error.response.json();
      if (response.message) {
        setDialogState({
          open: true,
          type: 'error',
          message: response.message,
        });
      }
    },
  });

  // 이메일 전송
  const { mutate: sendCodeMutate } = useSendCode({
    onSuccess: data => {
      // 이메일이 발송되었습니다.
      if (data.status === 200) {
      }
    },
    onError: async error => {
      const response = await error.response.json();
      if (response.message) {
        setDialogState({
          open: true,
          type: 'error',
          message: response.message,
        });
      }
    },
  });

  //이메일 인증
  const { mutate: verifyCodeMutate } = useVerifyCode({
    onSuccess: data => {
      if (data.status === 200) {
        setIsVerifyEmail(true);
      }
    },
    onError: async error => {
      const response = await error.response.json();
      if (response.message) {
        setDialogState({
          open: true,
          type: 'error',
          message: response.message,
        });
      }
    },
  });

  return (
    <>
      <CustomDialog
        open={dialogState.open}
        onClose={() => setDialogState({ open: false, message: '', type: 'error' })}
        icon={dialogState.type === 'error' ? <AlertRedIcon /> : <AlertCheckIcon />}
        mainMsg={dialogState.message}
      />

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
                {...register('nickname', {
                  required: '이름을 입력해주세요.',
                  minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
                })}
                onBlur={() => trigger('nickname')}
                placeholder="이름을 입력해주세요"
                variant={errors.nickname?.message ? 'error' : 'default'}
              />
              {errors.nickname?.message && (
                <Text variant="detail2" className="text-yoteyo-error p-1">
                  {errors.nickname?.message}
                </Text>
              )}
              {/* <Text variant="detail2" className="text-yoteyo-gray-200">
              * 한글은 10자, 영문은 20자 이내로 입력해 주세요
            </Text> */}
            </Box>
          </Box>

          <Box className="flex-col gap-y-3">
            <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>아이디</Label>
            <Box className="flex-col gap-y-2">
              <Input
                {...register('userid', {
                  required: '아이디를 입력해주세요.',
                  minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
                })}
                disabled={isAuthUserId}
                onBlur={() => trigger('userid')}
                placeholder="아이디를 입력해주세요"
                variant={errors.userid?.message ? 'error' : 'default'}
                iconProps={{
                  end: (
                    <Button
                      variant="icon"
                      size="icon"
                      className={cn(
                        'px-4 py-2 flex items-center justify-center',
                        isAuthUserId ? 'bg-[#E2E2E2] text-yoteyo-gray-300' : 'bg-[#F5ECFF] text-yoteyo-main ',
                      )}
                      onClick={() => {
                        userIdCheckMutate({
                          userid: getValues('userid'),
                        });
                      }}
                    >
                      <Text className="!text-[14px] font-semibold">중복확인</Text>
                    </Button>
                  ),
                }}
              />
              {errors.userid?.message && (
                <Text variant="detail2" className="text-yoteyo-error p-1">
                  {errors.userid?.message}
                </Text>
              )}
            </Box>
          </Box>

          <Box className="flex-col gap-y-3">
            <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이메일</Label>
            <Box className="flex-col gap-y-2">
              <Input
                {...register('username', {
                  required: '이메일을 입력해주세요.',
                  minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
                })}
                disabled={isAuthUserEmail}
                onBlur={() => trigger('username')}
                placeholder="이메일을 입력해주세요"
                variant={errors.username?.message ? 'error' : 'default'}
                iconProps={{
                  end: (
                    <Button
                      variant="icon"
                      size="icon"
                      className={cn(
                        'px-4 py-2 flex items-center justify-center',
                        isAuthUserEmail ? 'bg-[#E2E2E2] text-yoteyo-gray-300' : 'bg-[#F5ECFF] text-yoteyo-main ',
                      )}
                      onClick={() => {
                        userNameCheckMutate({
                          username: getValues('username'),
                        });
                      }}
                    >
                      <Text className="!text-[14px] font-semibold">중복확인</Text>
                    </Button>
                  ),
                }}
              />

              {errors.username?.message && (
                <Text variant="detail2" className="text-yoteyo-error p-1">
                  {errors.username?.message}
                </Text>
              )}
            </Box>
          </Box>

          {isAuthUserEmail && (
            <Box className="flex-col gap-y-3">
              <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이메일 인증</Label>
              <Box className="flex-col gap-y-2">
                <Input
                  placeholder="코드를 입력해주세요"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  iconProps={{
                    end: (
                      <Button
                        variant="icon"
                        size="icon"
                        className={cn(
                          'px-4 py-2 flex items-center justify-center',
                          isVerifyEmail ? 'bg-[#E2E2E2] text-yoteyo-gray-300' : 'bg-[#F5ECFF] text-yoteyo-main ',
                        )}
                        onClick={() => {
                          verifyCodeMutate({
                            username: getValues('username'),
                            code,
                          });
                        }}
                      >
                        <Text className="!text-[14px] font-semibold">인증</Text>
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}

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
                  required: '비밀번호 확인을 입력해주세요.',
                  validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
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
              <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={(check: boolean) => {
                  setChecked(check);
                }}
              />
              <Label htmlFor="terms">개인정보 수집 및 이용 동의(필수)</Label>
            </Box>
            <Dialog>
              <DialogTrigger>
                <Text variant="detail1" className="text-[#aaaaaa] underline cursor-pointer">
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
    </>
  );
}

export default Page;
