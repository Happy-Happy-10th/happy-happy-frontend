import {
  ErrorFormat,
  useCheckUserIdPayload,
  useCheckUserIdResponse,
  useCheckUserNamePayload,
  useCheckUserNameResponse,
  useSendCodeForFindUserIdPayload,
  useSendCodeForFindUserIdResponse,
  useSendCodePayload,
  useSendCodeResponse,
  useSignInPayload,
  useSignInResponse,
  useSignUpPayload,
  useSignUpResponse,
  useVerifyCodePayload,
  useVerifyCodeResponse,
} from '@/@types';
import {
  PostCheckUserId,
  PostCheckUserName,
  PostSendCode,
  PostSendCodeForFindUserId,
  PostSignIn,
  PostSignUp,
  PostVerifyCode,
} from '@/api/fragments/auth';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const useSignIn = (
  options: Exclude<
    UseMutationOptions<useSignInResponse, HTTPError<ErrorFormat>, useSignInPayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (payload: useSignInPayload) => {
      return (await PostSignIn({ ...payload })).json();
    },
    ...options,
  });
};

const useSignUp = (
  options: Exclude<
    UseMutationOptions<useSignUpResponse, HTTPError<ErrorFormat>, useSignUpPayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (payload: useSignUpPayload) => {
      return (await PostSignUp({ ...payload })).json();
    },
    ...options,
  });
};

const useCheckUserName = (
  options: Exclude<
    UseMutationOptions<useCheckUserNameResponse, HTTPError<ErrorFormat>, useCheckUserNamePayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['check-username'],
    mutationFn: async (payload: useCheckUserNamePayload) => {
      return (await PostCheckUserName({ ...payload })).json();
    },
    ...options,
  });
};

const useCheckUserId = (
  options: Exclude<
    UseMutationOptions<useCheckUserIdResponse, HTTPError<ErrorFormat>, useCheckUserIdPayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['check-userId'],
    mutationFn: async (payload: useCheckUserIdPayload) => {
      return (await PostCheckUserId({ ...payload })).json();
    },
    ...options,
  });
};

const useSendCode = (
  options: Exclude<
    UseMutationOptions<useSendCodeResponse, HTTPError<ErrorFormat>, useSendCodePayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['send-code'],
    mutationFn: async (payload: useSendCodePayload) => {
      return (await PostSendCode({ ...payload })).json();
    },
    ...options,
  });
};

const useVerifyCode = (
  options: Exclude<
    UseMutationOptions<useVerifyCodeResponse, HTTPError<ErrorFormat>, useVerifyCodePayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['verify-code'],
    mutationFn: async (payload: useVerifyCodePayload) => {
      return (await PostVerifyCode({ ...payload })).json();
    },
    ...options,
  });
};

const useSendCodeForFindUserID = (
  options: Exclude<
    UseMutationOptions<useSendCodeForFindUserIdResponse, HTTPError<ErrorFormat>, useSendCodeForFindUserIdPayload>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['send-code-find-userId'],
    mutationFn: async (payload: useSendCodeForFindUserIdPayload) => {
      return (await PostSendCodeForFindUserId({ ...payload })).json();
    },
    ...options,
  });
};

export { useSignIn, useSignUp, useCheckUserName, useCheckUserId, useSendCode, useVerifyCode, useSendCodeForFindUserID };
