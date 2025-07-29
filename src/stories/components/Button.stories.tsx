import { Box, Button, Text } from '@/components/base';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <Box className="w-100">
        <Button>
          <Text variant="head3">버튼</Text>
        </Button>
      </Box>
    );
  },
};
