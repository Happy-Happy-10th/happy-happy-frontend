import { useSignInPayload, useSignInResponse, useSignUpPayload, useSignUpResponse } from '@/@types';
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
