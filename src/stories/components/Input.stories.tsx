import EventTextInput from '@/components/base/Input/EventTitleInput';
import { Input } from '@/components/ui/input';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/AddEventInput',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const AddEventInput: Story = {
  render:()=>{
    return(
      <div className='w-full h-[95vh] flex justify-center items-center'>
        <div className='w-300'>
          <EventTextInput
            placeholder={"일정을 입력하세요."}
            disabled={true}
          />
        </div>
      </div>
    )
  }
};
