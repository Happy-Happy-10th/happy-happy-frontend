'use client';

import { useSendCodeForFindUserID, useVerifyCode } from '@/api';
import { AlertCheckIcon, AlertRedIcon, Box, Button, Input, Spinner, Text } from '@/components/base';
import { cn } from '@/utils/tailwind-utils';
import React, { useMemo, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useForm } from 'react-hook-form';
import { CustomDialog } from '../CustomDialog';

function FindUserIdForm() {
  const [code, setCode] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [dialogState, setDialogState] = useState<{ open: boolean; message: string; type: 'error' | 'success' }>({
    open: false,
    message: '',
    type: 'error',
  });

  const [time, setTime] = useState(0);

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      nickname: '',
    },
    mode: 'onSubmit',
  });

  const { mutate, isPending } = useSendCodeForFindUserID({
    onSuccess: data => {
      setTime(Date.now() + data.data.ttl * 1000);
      setIsSend(true);
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

  const onSubmit = async () => {
    if (isPending) return;
    const isSuccess = await trigger(['username', 'nickname']);
    if (isSuccess) {
      mutate({
        username: getValues('username'),
        nickname: getValues('nickname'),
      });
    }
  };

  return (
    <>
      <CustomDialog
        open={dialogState.open}
        onClose={() => setDialogState({ open: false, message: '', type: 'error' })}
        icon={dialogState.type === 'error' ? <AlertRedIcon /> : <AlertCheckIcon />}
        mainMsg={dialogState.message}
      />

      {isSend ? (
        <Box className="flex-col px-5 pt-9">
          <Text>이메일 인증코드를 입력해 주세요.</Text>

          <Box className="flex-col mt-6">
            <Input
              inputMode="numeric"
              id="code"
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
                      mutate({
                        username: getValues('username'),
                        nickname: getValues('nickname'),
                      });
                    }}
                  >
                    {isPending ? <Spinner /> : <Text className="!text-[14px] font-semibold">재전송</Text>}
                  </Button>
                ),
              }}
            />
            <Countdown
              date={time}
              renderer={props => {
                return (
                  <Text variant="detail2" className="mt-2">
                    * 인증키 유효시간{' '}
                    <Text variant="detail2" className="text-yoteyo-main">
                      {zeroPad(props.minutes, 2)}:{zeroPad(props.seconds, 2)}
                    </Text>{' '}
                    남았습니다.
                  </Text>
                );
              }}
            />

            <Button
              className="mt-6"
              onClick={() => {
                verifyCodeMutate({
                  username: getValues('username'),
                  code,
                });
              }}
            >
              인증완료
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="flex-col px-5 pt-9">
          <Text>회원가입 시 등록하신 정보로</Text>
          <Text>아이디를 확인하실 수 있습니다.</Text>

          <Box className="flex-col gap-y-3 mt-6">
            <Box className="flex-col">
              <Input
                id="id"
                {...register('nickname', {
                  required: '이름을 입력해주세요.',
                  minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
                })}
                placeholder="이름"
                onBlur={() => trigger('nickname')}
                variant={errors.nickname?.message ? 'error' : 'default'}
              />

              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.nickname?.message}
              </Text>
            </Box>

            <Box className="flex-col">
              <Input
                id="id"
                {...register('username', {
                  required: '이메일을 입력해주세요.',
                  minLength: { value: 2, message: '최소 2자리 이상 입력해주세요.' },
                })}
                placeholder="이메일"
                onBlur={() => trigger('username')}
                variant={errors.username?.message ? 'error' : 'default'}
              />

              <Text variant="detail2" className="text-yoteyo-error p-1">
                {errors.username?.message}
              </Text>
            </Box>
          </Box>

          <Button className="mt-6" onClick={onSubmit}>
            {isPending ? <Spinner /> : '이메일 인증'}
          </Button>
        </Box>
      )}
    </>
  );
}

export { FindUserIdForm };
