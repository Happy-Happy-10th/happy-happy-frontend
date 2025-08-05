import { Box, Button, Text } from '@/components/base';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <Box className="flex-col  w-full gap-y-2">
        <Text variant="title1" className="xl">
          Title1
        </Text>
        <Text variant="title2">Title2</Text>
        <Text variant="title3">Title3</Text>
        <Text variant="title4">Title4</Text>

        <Text variant="body1">Body1</Text>
        <Text variant="body2">Body2</Text>
        <Text variant="body3">Body3</Text>
        <Text variant="body4">Body4</Text>

        <Text variant="detail1">Detail1</Text>
        <Text variant="detail1">Detail2</Text>
      </Box>
    );
  },
};
