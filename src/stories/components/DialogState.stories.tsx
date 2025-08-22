
import { AlertCheckIcon, AlertPurpleIcon, AlertRedIcon } from '@/components/base';
import { CustomDialog } from '@/components/features';
import type { StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

const meta = {
  title: 'Components/Dialog',
};

export default meta;
type Story = StoryObj;

export const stateDialog: Story = {
  render: () => {
    const [open1,setOpen1] = useState<boolean>(false);
    const handleOpen1 = ()=>setOpen1(true)
    const handleClose1 = ()=>setOpen1(false)

    const [open2,setOpen2] = useState<boolean>(false);
    const handleOpen2 = ()=>setOpen2(true)
    const handleClose2 = ()=>setOpen2(false)

    const [open3,setOpen3] = useState<boolean>(false);
    const handleOpen3 = ()=>setOpen3(true)
    const handleClose3 = ()=>setOpen3(false)
    return (
      <div className='w-full flex flex-col gap-10 items-center'>
        <button
        className='w-100 h-30 border-yoteyo-main border-1'
          type='button'
          onClick={handleOpen1}
        >비밀번호 다이얼로그 오픈
        </button>
        <CustomDialog
          open={open1}
          onClose={handleClose1}
          icon={<AlertRedIcon/>}
          mainMsg="비밀번호를 잘못 입력했습니다"
          subMsg="입력하신 비밀번호가 올바르지 않습니다"
        />

        <button
          className='w-100 h-30 border-yoteyo-main border-1'
          type='button'
          onClick={handleOpen2}
        >회원가입 다이얼로그 오픈
        </button>
        <CustomDialog
          open={open2}
          onClose={handleClose2}
          icon={<AlertPurpleIcon/>}
          mainMsg="회원가입이 완료되지 않았습니다"
          subMsg="입력하신 비밀번호가 올바르지 않습니다"
        />

        <button
          className='w-100 h-30 border-yoteyo-main border-1'
          type='button'
          onClick={handleOpen3}
        >회원가입 완료 다이얼로그 오픈
        </button>
        <CustomDialog
          open={open3}
          onClose={handleClose3}
          icon={<AlertCheckIcon/>}
          mainMsg="회원가입이 완료되었습니다."
          subMsg="개인정보 처리방침이 어쩌구 저쩌구"
        />
      </div>
    );
  },
};
