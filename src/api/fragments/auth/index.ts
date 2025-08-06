import { useSignInPayload, useSignInResponse } from '@/@types';
import { yoteyoAPI } from '@/api/ky';

export const PostSignIn = async (payload: useSignInPayload) => {
  return await yoteyoAPI<useSignInResponse>(`auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};
