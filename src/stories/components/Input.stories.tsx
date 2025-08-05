import EventTextInput from '@/components/base/Input/EventTitleInput';
import { Box, Input as BaseInput, Text, Button } from '@/components/base';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Input',
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  render: () => {
    return (
      <Box className="w-full flex-col h-100 border p-4 gap-y-4">
        <Box className="flex-col">
          <Label>Default</Label>
          <BaseInput placeholder="일정을 입력하세요" />
        </Box>

        <Box className="flex-col">
          <Label>Error</Label>
          <BaseInput placeholder="일정을 입력하세요" variant="error" />
        </Box>

        <Box className="flex-col">
          <Label>disabled</Label>
          <BaseInput disabled placeholder="일정을 입력하세요" />
        </Box>

        <Box className="flex-col">
          <Label>Icons</Label>
          <BaseInput
            placeholder="아이디를 입력해주세요"
            iconProps={{
              end: (
                <Button variant="icon" size="icon">
                  <Box className="border w-20 h-8 flex justify-center items-center rounded-2xl">
                    <Text variant="body4" className="font-semibold">
                      중복 확인
                    </Text>
                  </Box>
                </Button>
              ),
            }}
          />
        </Box>
      </Box>
    );
  },
};

export const AddEventInput: Story = {
  render: () => {
    return (
      <div className="w-full h-[95vh] flex justify-center items-center">
        <div className="w-300">
          <EventTextInput placeholder={'일정을 입력하세요.'} disabled={true} />
        </div>
      </div>
    );
  },
};
