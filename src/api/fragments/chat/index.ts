import {
  usePostAIEventPayload,
  usePostAIEventResponse,
  usePostAIMessagePayload,
  usePostAIMessageResponse,
} from '@/@types';
import { yoteyoAPI } from '@/api/ky';

export const PostAIMessage = async (payload: usePostAIMessagePayload) => {
  const Requestbody = {
    parameters: {
      eventType: payload.parameters.eventType === 'online' ? '온라인' : '오프라인',
      title: payload.parameters.title,
      address: payload.parameters.address,
    },
  };

  return await yoteyoAPI<usePostAIMessageResponse>(`chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
    body: JSON.stringify({ ...Requestbody }),
  });
};

export const PostAIEvent = async (payload: usePostAIEventPayload) => {
  return await yoteyoAPI<usePostAIEventResponse>(`calendar/events/ai-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};
