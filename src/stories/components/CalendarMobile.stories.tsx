import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { calendarEvents } from '@/@mock/calendar';
import { CustomCalendar, CalendarContext } from '@/components/features/calendar';


const meta: Meta<typeof CustomCalendar> = {
  title: 'Components/CustomCalendar',
  component: CustomCalendar,
};

export default meta;
type Story = StoryObj<typeof CustomCalendar>;

export const MobileSize: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleCurrentDate = (updater: Date | ((prev: Date) => Date)) => {
      setCurrentDate(typeof updater === "function" ? updater(currentDate) : updater);
    };

    return (
      <div className='w-screen flex justify-center'>
        <div className='w-[354px] h-[430px]'>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            handleCurrentDate,
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
    </div>
    );
  },
};