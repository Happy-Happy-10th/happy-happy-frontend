import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/tailwind-utils';
import { Icon } from '../Icon';

interface PropsType extends React.ComponentProps<'textarea'> {
  rows?: number;
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}
export default function TextArea({ placeholder = '', rows = 1, className, value = '', icon, ...props }: PropsType) {
  const iconSize = 16;
  const iconGap = 8;
  const leftPad = iconSize + iconGap + 8;
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-2 top-3 w-6 h-6">
        <Icon className="w-full h-full">{icon}</Icon>
      </div>
      <Textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        className={cn(`pl-10 resize-none disabled:cursor-auto disabled:text-black disabled:opacity-100`, className)}
        {...props}
      />
    </div>
  );
}
