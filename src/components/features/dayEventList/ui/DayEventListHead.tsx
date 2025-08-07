"use client"
import clsx from 'clsx';
import { format } from 'date-fns';
import {ko} from "date-fns/locale";
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CustomDrawer } from '@/components/base/CustomDrawer';
import { UserEventForm } from "@/components/features/Form/";

import {useAuthStore} from '@/store'
import { useStore } from 'zustand';

const head = clsx(
  "mb-[30px] pl-[24px] pr-[24px] pt-[20px] pb-[14px]",
  "w-full h-[24px]",
  "flex flex-row justify-between"
)

type props ={date : Date}
export default function DayEventListHead({date=new Date()}:props){
  //로그인 체크
  const { user } = useStore(useAuthStore);
  
  const day = format(date, 'EEEE,dd', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭
  return (
    <div className={head}>
      <span className='font-bold text-[22px]'>{day}</span>
      {!user===null ?(
        <CustomDrawer
        trigger={
          <Button type='button' className='rounded-[50px] bg-[#C0C0C0] w-[24px] h-[24px]'>
            <Plus size={24}/>
          </Button>}
          contents={<UserEventForm/>}
          type="create"
      />
      ):(
      <Button 
        type='button' 
        className='rounded-[50px] bg-[#C0C0C0] w-[24px] h-[24px]'
        onClick={()=>{console.log('none login')}}
        >
          <Plus size={24}/>
        </Button>
      )}
    </div>
  )
}