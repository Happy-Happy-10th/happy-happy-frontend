type MemberInfo = {
  calendarId: number;
  imageUrl: string | null;
  marketingAgreedAt: string;
  memberId: string;
  nickname: string;
  username: string;
};
type useMyInfoResponse = {
  data: MemberInfo;
  message: string;
  status: number;
  timeStamp: string;
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
  data: MemberInfo;
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

type useSendCodeForFindUserIdPayload = {
  username: string;
  nickname: string;
};

type useSendCodeForFindUserIdResponse = {
  data: { success: boolean; message: string; ttl: number };
  message: string;
  status: number;
  timeStamp: string;
};

type useFindUserIdResponse = {
  data: {
    message: string;
    success: boolean;
    userId: string;
  };
  message: string;
  status: number;
  timeStamp: string;
};
type useFindUserIdPayload = {
  username: string;
  nickname: string;
};

export type {
  MemberInfo,
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
  useSendCodeForFindUserIdPayload,
  useSendCodeForFindUserIdResponse,
  useMyInfoResponse,
  useFindUserIdResponse,
  useFindUserIdPayload,
};
