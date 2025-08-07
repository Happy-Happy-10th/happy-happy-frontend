import { getCookie } from 'cookies-next/client';
import ky from 'ky';

const END_POINT = process.env.YOTEYO_API_URL;

const yoteyoAPI = ky.create({
  prefixUrl: END_POINT,
  hooks: {
    beforeRequest: [
      async request => {
        const accessTkn = getCookie('yt-atk');
        if (accessTkn) {
          request.headers.set('Authorization', `Bearer ${accessTkn}`);
          return;
        }
      },
    ],
    afterResponse: [
      async (request, _options, respose) => {
        return respose;
      },
    ],
    beforeError: [
      error => {
        const { response } = error;
        if (response && response.body) {
          error.cause = { code: response.status };
        }

        return error;
      },
    ],
  },
});

export { yoteyoAPI };
