type useSignInPayload = {
  username: string;
  password: string;
};

type useSignInResponse = {
  data: {
    accessToken: string;
    refreshToken: null | string;
    memberInfo: {
      memberId: string;
      username: string;
      nickname: string;
      imageUrl: string;
    };
  };
  status: number;
  message: string;
};
export type { useSignInPayload, useSignInResponse };
