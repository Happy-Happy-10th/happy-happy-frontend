
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { DayEventList } from '@/components/features';
import { calendarEvents, calendarEventsNone } from '@/@mock/calendar';

const meta = {
  title: 'Components/DayEventList',
  component: DayEventList,
  tags: ['autodocs'],
} satisfies Meta<typeof DayEventList>;

export default meta;
type Story = StoryObj<typeof DayEventList>;

export const dayEventList: Story = {
  render:()=>{
    const [selectedDate, setSelectedDate] = useState(new Date());
    return(
      <DayEventList selectedDate={selectedDate} dayEvents={calendarEvents}/>
    )
  }
};
