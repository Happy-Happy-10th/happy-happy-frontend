type MemberInfo = {
  memberId: string;
  username: string;
  nickname: string;
  imageUrl: string;
  calendarId: number;
};

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

  status: number;
  message: string;
  data: {
    memberId: string;
    userid: string;
    calendarId: number;
  };
  timeStamp: string;
};

type useCheckUserNamePayload = {
  username: string;
};

type useCheckUserNameResponse = any;

type useCheckUserIdPayload = {
  userid: string;
};

type useCheckUserIdResponse = {
  status: number;
  message: string;
  data: {
    available: boolean;
    message: string;
    type: string;
  };
  timeStamp: string;
};

type useSendCodePayload = {
  username: string;
};

type useSendCodeResponse = {
  status: number;
  message: string;
  timeStamp: string;
};

type useVerifyCodePayload = {
  username: string;
  code: string;
};

type useVerifyCodeResponse = {
  status: number;
  message: string;
  data: {
    message: string;
    success: boolean;
  };
  timeStamp: string;
};

export type {
  useSignInPayload,
  useSignInResponse,
  useSignUpPayload,
  useSignUpResponse,
  useCheckUserNamePayload,
  useCheckUserNameResponse,
  useCheckUserIdPayload,
  useCheckUserIdResponse,
  useSendCodePayload,
  useSendCodeResponse,
  useVerifyCodePayload,
  useVerifyCodeResponse,
  MemberInfo,
};
