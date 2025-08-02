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

export const Base: Story = {
  render: () => {
    return (
      <Box className="w-100">
        <Button>버튼</Button>
      </Box>
    );
  },
};

export const Outline: Story = {
  render: () => {
    return (
      <Box className="w-100">
        <Button variant="outline">버튼</Button>
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Box className="w-100">
        <Button disabled>버튼</Button>
      </Box>
    );
  },
};
