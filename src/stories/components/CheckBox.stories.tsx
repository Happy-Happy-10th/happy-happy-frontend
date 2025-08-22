import { Box, Input as BaseInput, Text, Button, Input } from '@/components/base';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/CheckBox',
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  render: () => {
    return (
      <Box className="w-full justify-center items-center flex-col">
        <Box className="flex mt-10 gap-x-2">
          <Checkbox id="check-box" />
          <Label htmlFor="check-box">Check Box</Label>
        </Box>
      </Box>
    );
  },
};
