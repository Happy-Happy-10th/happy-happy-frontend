import { EventColor } from '@/@types';
import clsx from 'clsx';

const colorClassMap: Record<EventColor, string> = {
  yoteyoRed: 'yoteyo-red',
  yoteyoOrange: 'yoteyo-orange',
  yoteyoYellow: 'yoteyo-yellow',
  yoteyoGreen: 'yoteyo-green',
  yoteyoEmerald: 'yoteyo-emerald',
  yoteyoSky: 'yoteyo-sky',
  yoteyoBlue: 'yoteyo-blue',
  yoteyoPurple: 'yoteyo-purple',
  yoteyoPink: 'yoteyo-pink',
  yoteyoBlack: 'yoteyo-black',
};

const colors: EventColor[] = Object.keys(colorClassMap) as EventColor[];

type PropsType = {
  value?: EventColor;
  onChange?: (value: EventColor) => void;
};

export default function ColorPicker({ value, onChange }: PropsType) {
  const handleSelected = (selected: EventColor) => {
    if (!onChange) return;
    onChange(value === selected ? "yoteyoGreen" : selected);
  };

  return (
    <div className="w-full pt-5 pb-5 pl-4 pr-4 yoteyo-m-title-main-sm">
      <span>이벤트 색상</span>
      <div className="w-full flex flex-row flex-wrap gap-4 pt-5">
        {colors.map((color) => (
          <div
            key={`colorItem_${color}`}
            className={clsx(
              `bg-${colorClassMap[color]}`,
              'w-8 h-8 rounded-full hover:cursor-pointer',
              value === color && 'ring-2 ring-yoteyo-main ring-offset-2'
            )}
            onClick={() => handleSelected(color)}
          />
        ))}
      </div>
    </div>
  );
}
