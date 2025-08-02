import ky from 'ky';

const END_POINT = process.env.YOTEYO_API_URL;

const yoteyoAPI = ky.create({
  prefixUrl: END_POINT,
  hooks: {
    beforeRequest: [
      async () => {
        // API 요청 전처리
        console.log('before!');
      },
    ],
    afterResponse: [
      async () => {
        // API 요청 후처리
        console.log('after!');
      },
    ],
    beforeError: [
      error => {
        // 에러 객체 초기화 / 재정의
        return error;
      },
    ],
  },
});

export { yoteyoAPI };
