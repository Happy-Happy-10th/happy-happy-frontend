import { ApiAiSearchRegionType, ApiTimeFormayType, ApiWeekStartDayType } from '@/@types';
import {
  getRegionSido,
  getRegionSigungu,
  getUserSetting,
  patchUserAiSerchRegion,
  patchUserTimeFormat,
  patchUserWeekStartDay,
} from '@/api';

export const userSettingsService = {
  getUserSetting: async (calendarId: number) => {
    const result = await getUserSetting(calendarId).then(res => res.json());
    return result.data;
  },
  patchUserWeekStartDay: async (calendarId: number, payload: ApiWeekStartDayType) =>
    await patchUserWeekStartDay(calendarId, payload),

  patchUserTimeFormat: async (calendarId: number, payload: ApiTimeFormayType) =>
    await patchUserTimeFormat(calendarId, payload),

  patchUserAiSerchRegion: async (calendarId: number, payload: ApiAiSearchRegionType) =>
    await patchUserAiSerchRegion(calendarId, payload),

  getRegionSido: async () => (await getRegionSido()).json(),
  getRegionSigungu: async (sidoCode: string) => (await getRegionSigungu(sidoCode)).json(),
};
