import { useEffect, useState } from "react"
import clsx from "clsx"

import { SetDateHandler } from "@/@types"
import  CustomSelect  from "@/components/base/Select/Select"

const timeSelectorFrame= clsx(
  "flex flex-row gap-2 justify-center w-full h-52 pr-[57px] pl-[57px] pt-5 pb-5"
)

type PropsType = {
  targetDate ?: Date, 
  setTargetDate ?: SetDateHandler
}
export default function TimePicker({targetDate = new Date(), setTargetDate = ()=>{}}:PropsType){
  const [ampm, setAmpm] = useState<'오전' | '오후'>('오전');
  const handleAmpm = (value:string)=>value==='오전'?setAmpm('오전'):setAmpm('오후');
  const [hour, setHour] = useState<string>('1');
  const handletime = (value:string)=>setHour(value);
  const [minute, setMinute] = useState<string>('00');
  const handleMinute = (value:string)=>setMinute(value);
  
  
  useEffect(() => {
    const base = new Date(targetDate); // 기존 날짜 복사
    let h = parseInt(hour, 10);

    if (ampm === '오후' && h < 12) h += 12;
    if (ampm === '오전' && h === 12) h = 0; // 오전 12시는 0시로 변환

    base.setHours(h);
    base.setMinutes(parseInt(minute, 10));
    base.setSeconds(0);
    base.setMilliseconds(0);

    setTargetDate(base);
  }, [ampm, hour, minute]);
  return(
    <div className={timeSelectorFrame}>
      <CustomSelect
        className="data-[state=open]:border-yoteyo-main"
        selectItems={['오전','오후']}
        onChangedFn ={handleAmpm}
      />

      <CustomSelect
        className="data-[state=open]:border-yoteyo-main"
        selectItems={['1','2','3','4','5','6','7','8','9','10','11','12']}
        onChangedFn ={handletime}
      />

      <CustomSelect
        className="data-[state=open]:border-yoteyo-main"
        selectItems={['00','05','10','15','20','25','30','35','40','45','50','55']}
        onChangedFn ={handleMinute}
      />
    </div>
  )
}
