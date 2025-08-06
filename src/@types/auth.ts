type useSignInPayload = {
  userid: string;
  password: string;
};

type MemberInfo = {
  memberId: string;
  username: string;
  nickname: string;
  imageUrl: string;
};

type useSignInResponse = {
  data: {
    accessToken: string;
    refreshToken: null | string;
    memberInfo: MemberInfo;
  };
  status: number;
  message: string;
};
export type { useSignInPayload, useSignInResponse, MemberInfo };
