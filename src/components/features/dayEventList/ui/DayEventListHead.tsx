import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { format } from 'date-fns';
import {ko} from "date-fns/locale";
import { Plus } from 'lucide-react';

const head = clsx(
  "mb-[18px]",
  "flex flex-row justify-between"
)

type props ={date : Date}
export default function DayEventListHead({date=new Date()}:props){
  const day = format(date, 'EEEE,dd', { locale: ko }); // 'EEE'는 Mon, Tue 같은 약칭
  return (
    <div className={head}>
      <span className='font-bold text-[22px]'>{day}</span>
      <Button className='rounded-[50px] bg-[#C0C0C0]'>
        <Plus size={24}/>
      </Button>
    </div>
  )
}