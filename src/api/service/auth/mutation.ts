import { useSignInPayload, useSignInResponse } from '@/@types';
import { PostSignIn } from '@/api/fragments/auth';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const useSignIn = (
  options: Exclude<UseMutationOptions<useSignInResponse, HTTPError, useSignInPayload, unknown>, 'mutationFn'>,
) => {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (payload: useSignInPayload) => await PostSignIn({ ...payload }),
    ...options,
  });
};
export { useSignIn };
