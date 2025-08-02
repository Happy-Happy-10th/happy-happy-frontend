// Date 객채 커스텀 훅 타입
export type UseDateStateType = readonly [Date, SetDateHandler];
export type SetDateHandler = (updater: Date | ((prev: Date) => Date)) => void;