import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/tailwind-utils';

interface PropsType extends React.ComponentProps<'textarea'> {
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
}
export default function TextArea({ placeholder = '', rows = 1, className, value = '', ...props }: PropsType) {
  return (
    <Textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      className={cn('resize-none disabled:cursor-auto disabled:text-black disabled:opacity-100', className)}
      {...props}
    />
  );
}
