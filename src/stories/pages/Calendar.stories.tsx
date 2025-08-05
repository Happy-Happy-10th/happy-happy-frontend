import type { Meta, StoryObj } from '@storybook/nextjs';
import TestCalendar from '../test/TestCalendar';
import ServiceLayout from '../../components/layouts/ServiceLayout';

const meta: Meta<typeof TestCalendar> = {
  title: 'pages/Calendar',
  component: TestCalendar,
};

export default meta;
type Story = StoryObj<typeof TestCalendar>;

export const Calendar: Story = {
  render: (args) => (
    <div className="w-screen h-screen">
      <ServiceLayout>
        <TestCalendar/>
      </ServiceLayout>
    </div>
  )
};
