import type { Meta, StoryObj } from '@storybook/nextjs';
import TestCalendar from '../test/TestCalendar';
import RootLayout from '../test/Layout';

interface NavigatorStoryArgs {
  deviceWidthPx: number;
  deviceHeightPx: number;
}

const meta: Meta<typeof TestCalendar> = {
  title: 'pages/Calendar',
  component: TestCalendar,
  args: {
    deviceWidthPx: 1200,
    deviceHeightPx: 800,
  },
  argTypes: {
    deviceWidthPx: {
      control: { type: 'range', min: 383, max: 1280, step: 10 },
    },
    deviceHeightPx: {
      control: { type: 'range', min: 800, max: 870, step: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta & { args: NavigatorStoryArgs }>;

export const Calendar: Story = {
  args: {
    deviceWidthPx: 1200
  },

  render: (args) => (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        style={{
          width: `${args.deviceWidthPx}px`,
          height: `${args.deviceHeightPx}px`,
        }}
        className="border border-solid flex flex-col"
      >
        <RootLayout>
          <TestCalendar/>
        </RootLayout>
      </div>
    </div>
  )
};
