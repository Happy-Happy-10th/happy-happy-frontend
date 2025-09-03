import { useResetUserPassword } from '@/api/service/auth';
import {
  AlertCheckIcon,
  AlertRedIcon,
  Box,
  Button,
  EyeOffIcon,
  EyeOnIcon,
  Icon,
  Input,
  Spinner,
  Text,
} from '@/components/base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomDialog } from '../CustomDialog';
import { useRouter } from 'next/navigation';

type Props = {
  userid: string;
  username: string;
};

function ResetPasswordForm({ userid, username }: Props) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  const router = useRouter();

  const [dialogState, setDialogState] = useState<{ open: boolean; message: string; type: 'error' | 'success' }>({
    open: false,
    message: '',
    type: 'error',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordCheck: false,
  });

  // 비밀번호 초기화
  const { mutate, isPending } = useResetUserPassword({
    onSuccess: data => {
      if (data.status === 200) {
        setDialogState({ message: data.message, open: true, type: 'success' });
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

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async () => {
    if (isPending) return;
    const isSuccess = await trigger(['password', 'passwordCheck']);
    if (isSuccess) {
      mutate({
        userid,
        username,
        newPassword: getValues('password'),
        passwordCheck: getValues('passwordCheck'),
        passwordConfirmed: true,
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
        onSubmit={() => {
          if (dialogState.type === 'success') router.push('/auth/login');
        }}
      />

      <Text className="font-medium">비밀번호를 재설정해주세요</Text>

      <Box className="flex-col">
        <Input
          id="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: passwordRegex,
              message: '영문 대소문자, 숫자, 특수문자를 3가지 이상 조합하여 8자리 이상 입력해주세요.',
            },
          })}
          className="mt-6"
          placeholder="새 비밀번호"
          variant={errors.password?.message ? 'error' : 'default'}
          type={passwordVisible.password ? 'text' : 'password'}
          onBlur={() => trigger('password')}
          iconProps={{
            end: (
              <Button
                variant="icon"
                size="icon"
                onClick={() => setPasswordVisible(prev => ({ ...prev, password: !prev.password }))}
              >
                <Icon className="w-5 h-5">{passwordVisible.password ? <EyeOffIcon /> : <EyeOnIcon />}</Icon>
              </Button>
            ),
          }}
        />
        <Text variant="detail2" className="text-yoteyo-error p-1">
          {errors.password?.message}
        </Text>
      </Box>
      <Box className="flex-col">
        <Input
          id="passwordCheck"
          {...register('passwordCheck', {
            required: '비밀번호를 확인해주세요.',

            validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
          className="mt-3"
          placeholder="새 비밀번호 확인"
          variant={errors.passwordCheck?.message ? 'error' : 'default'}
          type={passwordVisible.passwordCheck ? 'text' : 'password'}
          onBlur={() => trigger('passwordCheck')}
          iconProps={{
            end: (
              <Button
                variant="icon"
                size="icon"
                onClick={() => setPasswordVisible(prev => ({ ...prev, passwordCheck: !prev.passwordCheck }))}
              >
                <Icon className="w-5 h-5">{passwordVisible.passwordCheck ? <EyeOffIcon /> : <EyeOnIcon />}</Icon>
              </Button>
            ),
          }}
        />
        <Text variant="detail2" className="text-yoteyo-error p-1">
          {errors.passwordCheck?.message}
        </Text>
      </Box>

      <Button className="mt-6" onClick={onSubmit}>
        {isPending ? <Spinner /> : '비밀번호 변경'}
      </Button>
    </>
  );
}

export default ResetPasswordForm;
