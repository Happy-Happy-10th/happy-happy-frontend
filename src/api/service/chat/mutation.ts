import { usePostAIMessagePayload, usePostAIMessageResponse } from '@/@types';
import { PostAIMessage } from '@/api/fragments/chat';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const usePostAIMessage = (
  options: Exclude<
    UseMutationOptions<usePostAIMessageResponse, HTTPError, usePostAIMessagePayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (payload: usePostAIMessagePayload) => {
      return (await PostAIMessage({ ...payload })).json();
    },
    ...options,
  });
};

export { usePostAIMessage };
