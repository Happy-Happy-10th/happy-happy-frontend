import {
  useCheckUserIdPayload,
  useCheckUserIdResponse,
  useCheckUserNamePayload,
  useCheckUserNameResponse,
  useSendCodePayload,
  useSendCodeResponse,
  useSignInPayload,
  useSignInResponse,
  useSignUpPayload,
  useSignUpResponse,
  useVerifyCodePayload,
  useVerifyCodeResponse,
} from '@/@types';
import { yoteyoAPI } from '@/api/ky';

export const getHealth = async () => {
  return await yoteyoAPI(`health`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PostSignIn = async (payload: useSignInPayload) => {
  return await yoteyoAPI<useSignInResponse>(`auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};

export const PostSignUp = async (payload: useSignUpPayload) => {
  return await yoteyoAPI<useSignUpResponse>(`auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};

export const PostCheckUserName = async (payload: useCheckUserNamePayload) => {
  return await yoteyoAPI<useCheckUserNameResponse>(`auth/check-username`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};

export const PostCheckUserId = async (payload: useCheckUserIdPayload) => {
  return await yoteyoAPI<useCheckUserIdResponse>(`auth/check-userid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};

export const PostSendCode = async (payload: useSendCodePayload) => {
  return await yoteyoAPI<useSendCodeResponse>(`auth/send-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};

export const PostVerifyCode = async (payload: useVerifyCodePayload) => {
  return await yoteyoAPI<useVerifyCodeResponse>(`auth/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};
