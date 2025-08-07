import { usePostAIMessagePayload } from '@/@types';
import { yoteyoAPI } from '@/api/ky';

export const PostAIMessage = async (payload: usePostAIMessagePayload) => {
  return await yoteyoAPI<any>(`chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });
};
