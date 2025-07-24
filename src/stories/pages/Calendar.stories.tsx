import TestCalendar from '../test/TestCalendar';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

const meta = {
  title: 'Pages/CalendarPage',
  component: TestCalendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TestCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarPage: Story = {
  render : ()=>{
    return (
      <div className='w-screen h-screen flex justify-center'>
        <TestCalendar/>
      </div>
    )
  }
};
