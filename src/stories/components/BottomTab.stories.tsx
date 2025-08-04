import { BottomTab } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/nextjs';

interface BottomTabStoryArgs {
  deviceWidthPx: number;
  deviceHeightPx: number;
}

const meta: Meta<typeof BottomTab> = {
  title: 'Components/BottomTab',
  component: BottomTab,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deviceWidthPx: 1200
  },

  render: () => (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <BottomTab />
    </div>
  )
};
