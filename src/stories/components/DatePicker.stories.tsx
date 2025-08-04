import { DatePicker } from '@/components/features/eventset/ui/datePicker';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const datePicker: Story = {
  render: () => {
    return (
      <div className='w-full h-[96vh] flex justify-center items-center'>
        <div className='w-[354px] border-1 border-soild'>
          <DatePicker/>
        </div>
      </div>
    );
  },
};