import type { Meta, StoryObj } from '@storybook/nextjs';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import UserEventCheck from '@/components/layouts/UserEventCheck';
import { CustomDrawer } from "@/components/base";
import { Button } from "@/components/ui/button";
import { calendarEvents } from '@/@mock/calendar';
import DayEventBox from '@/components/features/dayEventList/ui/DayEventBox';

const meta: Meta<typeof UserEventCheck> = {
  title: 'pages/UserEventCheck',
  component: UserEventCheck,
};

export default meta;
type Story = StoryObj<typeof UserEventCheck>;

export const userEventCheck: Story = {
  render: () => (
    <div className="w-screen h-screen">
      <ServiceLayout>
        <div>
        <CustomDrawer
          trigger={<DayEventBox event={calendarEvents[0]}/>}
          contents={ <UserEventCheck event={calendarEvents[0]}/>}
      />
        </div>
      </ServiceLayout>
    </div>
  )
};
