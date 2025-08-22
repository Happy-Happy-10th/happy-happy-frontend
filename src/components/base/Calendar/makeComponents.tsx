import { CalendarEventType, SetDateHandler } from '@/@types';
import { Components, ToolbarProps } from 'react-big-calendar';
// base Components
import { CalendarToolbar } from './CalendarToolbar';
import { CalendarDateHeader } from './DateHeader';
import { CalendarMonthHeader } from './MonthHead';
import { CalendarEventDetail, CalendarEventMinimal } from './CalendarEvent';

type OptionType = { isWide: boolean; onChangeViewDate: SetDateHandler };
export function makeCustomComponents({ isWide, onChangeViewDate }: OptionType): Components<CalendarEventType, object> {
  return {
    toolbar: (p: ToolbarProps<CalendarEventType>) => <CalendarToolbar {...p} onChangeViewDate={onChangeViewDate} />,
    month: {
      dateHeader: CalendarDateHeader,
      header: CalendarMonthHeader,
    },
    event: eventProps =>
      isWide ? <CalendarEventDetail {...eventProps.event} /> : <CalendarEventMinimal {...eventProps.event} />,
  };
}
