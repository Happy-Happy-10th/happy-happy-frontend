import type { Meta, StoryObj } from '@storybook/nextjs';
import TestCalendar from '../test/TestCalendar';
import RootLayout from '../test/Layout';

const meta: Meta<typeof TestCalendar> = {
  title: 'pages/Calendar',
  component: TestCalendar,
};

export default meta;
type Story = StoryObj<typeof TestCalendar>;

export const Calendar: Story = {
  render: (args) => (
    <div className="w-screen h-screen">
      <RootLayout>
        <TestCalendar/>
      </RootLayout>
    </div>
  )
};
