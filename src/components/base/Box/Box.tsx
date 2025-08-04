import { cn } from '@/utils/tailwind-utils';
import { cva, VariantProps } from 'class-variance-authority';

const boxVariants = cva('box', {
  variants: {
    variant: {
      default: 'flex break-all',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Box = ({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof boxVariants>) => {
  return (
    <div className={cn(boxVariants({ variant }), className)} {...props}>
      {props.children}
    </div>
  );
};
