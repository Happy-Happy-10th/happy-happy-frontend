import type { Meta, StoryObj } from '@storybook/nextjs';
import RootLayout from '../test/Layout';
import TestAddEvent from '../test/TestAddEvent';

const meta: Meta<typeof TestAddEvent> = {
  title: 'pages/AddEvent',
  component: TestAddEvent,
};

export default meta;
type Story = StoryObj<typeof TestAddEvent>;

export const AddEvent: Story = {
  render: () => (
    <div className="w-screen h-screen">
      <RootLayout>
        <TestAddEvent/>
      </RootLayout>
    </div>
  )
};
