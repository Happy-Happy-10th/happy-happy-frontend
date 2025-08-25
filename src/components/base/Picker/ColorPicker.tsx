import { EventColor } from '@/@types';
import clsx from 'clsx';

// Gray 색상은 취소된 일정에만 적용해야 함으로 키 제거
type NonGrayColorMap = Exclude<EventColor, 'yoteyoGray'>;
const colorClassMap: Record<NonGrayColorMap, string> = {
  yoteyoRed: 'yoteyo-red',
  yoteyoOrange: 'yoteyo-orange',
  yoteyoYellow: 'yoteyo-yellow',
  yoteyoGreen: 'yoteyo-green',
  yoteyoEmerald: 'yoteyo-emerald',
  yoteyoSky: 'yoteyo-sky',
  yoteyoBlue: 'yoteyo-blue',
  yoteyoNavy: 'yoteyo-navy',
  yoteyoPurple: 'yoteyo-purple',
  yoteyoPink: 'yoteyo-pink',
};

const colors: NonGrayColorMap[] = Object.keys(colorClassMap) as NonGrayColorMap[];

type PropsType = {
  value?: EventColor;
  onChange?: (value: EventColor) => void;
};

export default function ColorPicker({ value, onChange }: PropsType) {
  const handleSelected = (selected: EventColor) => {
    if (!onChange) return;
    onChange(value === selected ? 'yoteyoGreen' : selected);
  };

  return (
    <div className="w-full pt-5 pb-5 pl-4 pr-4 yoteyo-m-title-main-sm">
      <span>이벤트 색상</span>
      <div className="w-full flex flex-row flex-wrap gap-4 pt-5">
        {colors.map(color => (
          <div
            key={`colorItem_${color}`}
            className={clsx(
              `bg-${colorClassMap[color]}`,
              'w-8 h-8 rounded-full hover:cursor-pointer',
              value === color && 'ring-2 ring-yoteyo-main ring-offset-2',
            )}
            onClick={() => handleSelected(color)}
          />
        ))}
      </div>
    </div>
  );
}
