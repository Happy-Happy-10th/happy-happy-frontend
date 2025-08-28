import {
  ApiResponse,
  ApiEmpty,
  ApiAiSearchRegionType,
  ApiCalendarSettingType,
  ApiTimeFormayType,
  ApiWeekStartDayType,
} from '@/@types';
import { yoteyoAPI } from '@/api';
//사용자 설정 가져오기
export async function getUserSetting(caldnarId: number) {
  return await yoteyoAPI<ApiResponse<ApiCalendarSettingType>>(`calendar/${caldnarId}/settings`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
//사용자 주 시작일 설정 패치
export async function patchUserWeekStartDay(caldnarId: number, payload: ApiWeekStartDayType) {
  return await yoteyoAPI<ApiResponse<ApiEmpty>>(`calendar/${caldnarId}/settings/week-start-day`, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// 사용자 시간대 설정
export async function patchUserTimeFormat(caldnarId: number, payload: ApiTimeFormayType) {
  return await yoteyoAPI<ApiResponse<ApiEmpty>>(`calendar/${caldnarId}/settings/time-format`, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// AI 검색시 사용할 지열 설정
export async function patchUserAiSerchRegion(caldnarId: number, payload: ApiAiSearchRegionType) {
  return yoteyoAPI<ApiResponse<ApiEmpty>>(`calendar/${caldnarId}/settings/ai-search-region`, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
