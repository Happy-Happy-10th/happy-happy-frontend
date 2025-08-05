import { BottomTab } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof BottomTab> = {
  title: 'Components/BottomTab',
  component: BottomTab,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <BottomTab />
    </div>
  )
};
