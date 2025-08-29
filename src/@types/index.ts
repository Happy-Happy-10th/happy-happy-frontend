export * from './products';

export * from './hooks';

export * from './auth';

export * from './drawer';

export * from './pickerType';

export * from './chat';

export * from './calendar';

export * from './userSetting';

export type ErrorFormat = {
  status: number;
  message: string;
  code: string;
  timeStamp: string;
};

// 백엔드 응답 형태 통일에 따른 공통 응답 타입 정의
export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  timeStamp: string;
};
// mutation 중 data 필드에 응답이 없는경우 사용
export type ApiEmpty = Record<string, never>;
