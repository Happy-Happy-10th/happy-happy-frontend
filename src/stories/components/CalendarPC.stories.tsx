import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { calendarEvents } from '@/@mock/calendar';
import {CustomCalendar} from '@/components/features/calendar';
import { CalendarContext } from '@/components/features/calendar';



const meta: Meta<typeof CustomCalendar> = {
  title: 'Components/CustomCalendar',
  component: CustomCalendar,
  args: {
    calendarHightPx: '645px',
    calendarWidthPx: '1150px', 
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

export const PCSize: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
      <div className='w-screen flex justify-center'>
        <div className='w-[870px] h-[696px]'>
        <CalendarContext.Provider
          value={{
            events: calendarEvents,
            isMondayStart: true,
            currentDate,
            setCurrentDate,
          }}
        >
          <CustomCalendar.View />
        </CalendarContext.Provider>
      </div>
    </div>
    );
  },
};