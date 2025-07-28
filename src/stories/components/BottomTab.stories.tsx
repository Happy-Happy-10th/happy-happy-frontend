import { BottomTab } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/nextjs';


interface BottomTabStoryArgs {
  deviceWidthPx: number;
  deviceHeightPx: number;
}

const meta: Meta<typeof BottomTab> = {
  title: 'Components/BottomTab',
  component: BottomTab,
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
type Story = StoryObj<typeof meta & { args: BottomTabStoryArgs }>;

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
        <BottomTab />
      </div>
    </div>
  )
};
