import {
  ErrorFormat,
  usePostAIEventPayload,
  usePostAIEventResponse,
  usePostAIMessagePayload,
  usePostAIMessageResponse,
} from '@/@types';
import { PostAIEvent, PostAIMessage } from '@/api/fragments/chat';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const usePostAIMessage = (
  options: Exclude<
    UseMutationOptions<
      usePostAIMessageResponse,
      HTTPError<ErrorFormat & { data: string }>,
      usePostAIMessagePayload,
      unknown
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['post-ai-message'],
    mutationFn: async (payload: usePostAIMessagePayload) => {
      return (await PostAIMessage({ ...payload })).json();
    },
    ...options,
  });
};

const usePostAIEvent = (
  options: Exclude<
    UseMutationOptions<usePostAIEventResponse, HTTPError<ErrorFormat>, usePostAIEventPayload, unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['post-ai-event'],
    mutationFn: async (payload: usePostAIEventPayload) => {
      return (await PostAIEvent({ ...payload })).json();
    },
    ...options,
  });
};

export { usePostAIMessage, usePostAIEvent };
