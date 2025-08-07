type useSignInPayload = {
  userid: string;
  password: string;
};

type useSignUpPayload = {
  nickname: string;
  userid: string;
  username: string;
  password: string;
  passwordCheck: string;
  privacyAgreement: boolean;
  passwordConfirmed: boolean;
};

type MemberInfo = {
  memberId: string;
  username: string;
  nickname: string;
  imageUrl: string;
  calendarId: number;
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

type useSignUpResponse = {
  memberId: string;
  userid: string;
};

export type { useSignInPayload, useSignInResponse, useSignUpPayload, useSignUpResponse, MemberInfo };
