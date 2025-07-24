import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import CustomCalendar from '@/components/features/calendar';
import { calendarEvents } from '@/@mock/calendar';
import { CalendarContext } from '@/components/features/calendar/provider/CalendarContext';


const meta: Meta<typeof CustomCalendar> = {
  title: 'Components/CustomCalendar',
  component: CustomCalendar,
  args: {
    calendarHightPx: '645px',
    calendarWidthPx: '354px', 
  },
  argTypes: {
    calendarHightPx: {
      control: { type: 'text' },
      description: '캘린더의 높이를 px 단위로 지정',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCalendar>;

export const MobileSize: Story = {
  render: (args) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
      <div className='w-screen flex justify-center'>
        <div className='w-[363px]'>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            setCurrentDate,
            calendarHight: args.calendarHightPx,
            calendarWidth : args.calendarWidthPx
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
    </div>
    );
  },
};