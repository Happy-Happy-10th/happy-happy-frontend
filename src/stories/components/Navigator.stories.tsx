import type { Meta, StoryObj } from '@storybook/nextjs';
import * as nextNavigation from "next/navigation";
import { Navigator } from '@/components/base';

interface NavigatorStoryArgs {
  deviceWidthPx: number;
  deviceHeightPx: number;
}

const meta: Meta<typeof Navigator> = {
  title: 'Components/Navigator',
  component: Navigator,
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

export const Default: Story = {
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
        className="border border-solid flex flex-col justify-end"
      >
        <Navigator />
      </div>
    </div>
  )
};
