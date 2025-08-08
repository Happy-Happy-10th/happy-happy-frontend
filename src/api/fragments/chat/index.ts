import { usePostAIMessagePayload } from '@/@types';
import { yoteyoAPI } from '@/api/ky';

export const PostAIMessage = async (payload: usePostAIMessagePayload) => {
  const Requestbody = {
    parameters: {
      eventType: payload.parameters.eventType === 'online' ? '온라인' : '오프라인',
      title: payload.parameters.title,
      address: payload.parameters.address,
    },
  };

  return await yoteyoAPI<any>(`chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
    body: JSON.stringify({ ...Requestbody }),
  });
};
