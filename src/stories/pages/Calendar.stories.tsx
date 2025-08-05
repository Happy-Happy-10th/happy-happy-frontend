import type { Meta, StoryObj } from '@storybook/nextjs';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import CalendarPage from '@/components/layouts/CalendarPage';

const meta: Meta<typeof CalendarPage> = {
  title: 'pages/Calendar',
  component: CalendarPage,
};

export default meta;
type Story = StoryObj<typeof CalendarPage>;

export const Calendar: Story = {
  render: (args) => (
    <div className="w-screen h-screen">
      <ServiceLayout>
        <CalendarPage/>
      </ServiceLayout>
    </div>
  )
};
