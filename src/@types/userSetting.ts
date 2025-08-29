//사용자 캘린더 셋팅 타입
export type WeekStartDayEnum = 'MONDAY' | 'SUNDAY';
export type TimeFormatEnum = 'TWELVE_HOUR' | 'TWENTY_FOUR_HOUR';
export type AiSearchRegion = {
  sidoCode: string;
  sidoName: string;
  sigunguCode: string;
  sigunguName: string;
};

//사용자 캘린더 설정 Api 관련 타입들
export type ApiCalendarSettingType = {
  calendarId: number;
  weekStartDay: WeekStartDayEnum;
  timeFormat: TimeFormatEnum;
  aiSearchRegion: AiSearchRegion;
};

//payload 타입들
export type ApiWeekStartDayType = {
  weekStartDay: WeekStartDayEnum;
};
export type ApiTimeFormayType = {
  timeFormat: WeekStartDayEnum;
};

export type ApiAiSearchRegionType = {
  sidoCode: string;
  sigunguCode: string;
};
