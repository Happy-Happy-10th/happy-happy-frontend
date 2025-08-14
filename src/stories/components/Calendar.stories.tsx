import type { Meta, StoryObj } from '@storybook/react';

import { CustomCalendar } from '@/components/features';
import { useDateState } from '@/hooks';
import { calendarEvents } from '@/@mock/calendar';

const meta: Meta<typeof CustomCalendar> = {
  title: 'Components/Calendar',
  component: CustomCalendar,
};

export default meta;
type Story = StoryObj<typeof CustomCalendar>;

export const customCalendar: Story = {
  render: () => {
    const [viewDate, setViewDate] = useDateState(new Date());
    const [selectedDate, setSelectedDate] = useDateState(new Date());

    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CustomCalendar
          className='w-full h-full'
          events={calendarEvents}
          viewDate={viewDate}
          isMondayStart={true}
          onChangeViewDate={setViewDate}
        />
      </div>
    );
  },
};
