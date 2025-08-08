import { DateSelector } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof DateSelector> = {
  title: 'Components/DatePicker',
  component: DateSelector,
};

export default meta;
type Story = StoryObj<typeof DateSelector>;

export const datePicker: Story = {
  render: () => {
    const methods = useForm({
    defaultValues: {
      allDay: true,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
    return (
      <div className='w-full h-[96vh] flex justify-center items-center'>
        <div className='w-[354px] border-1 border-soild'>
          <FormProvider {...methods}>
            <DateSelector/>
          </FormProvider>
        </div>
      </div>
    );
  },
};