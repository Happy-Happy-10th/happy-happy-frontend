import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";

export function createLocalizer(isMondayStart: boolean) {
  return dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () =>
      startOfWeek(new Date(), { weekStartsOn: isMondayStart ? 1 : 0 }),
    getDay,
    locales: { ko },
  });
}