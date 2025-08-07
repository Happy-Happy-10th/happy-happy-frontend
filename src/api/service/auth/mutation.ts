import { useSignInPayload, useSignInResponse, useSignUpPayload, useSignUpResponse } from '@/@types';
import { PostSignIn, PostSignUp } from '@/api/fragments/auth';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const useSignIn = (
  options: Exclude<UseMutationOptions<useSignInResponse, HTTPError, useSignInPayload, unknown>, 'mutationFn'>,
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
  options: Exclude<UseMutationOptions<useSignUpResponse, HTTPError, useSignUpPayload, unknown>, 'mutationFn'>,
) => {
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (payload: useSignUpPayload) => {
      return (await PostSignUp({ ...payload })).json();
    },
    ...options,
  });
};

export { useSignIn, useSignUp };
