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
        <div className='w-89 h-15'>
          <div className="relative w-full">
            <div className="absolute top-0 bottom-0 left-0 w-[8px] bg-yoteyo-green rounded-l-md" />
              <Input
                placeholder="일정을 입력하세요"
                className="pl-4"
              />
            </div>
        </div>
      </div>
    )
  }
};
