import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Box,
} from '@/components/base';
import type { StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Dialog',
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <Box>
            <DialogClose>zz</DialogClose>
          </Box>
        </DialogContent>
      </Dialog>
    );
  },
};
