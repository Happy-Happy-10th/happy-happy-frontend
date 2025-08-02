import { cn } from '@/utils/tailwind-utils';
import { cva, VariantProps } from 'class-variance-authority';

const iconVariants = cva('icon', {
  variants: {
    variant: {
      default: 'inline-flex justify-center items-center w-8 h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Icon = ({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof iconVariants>) => {
  return (
    <span className={cn(iconVariants({ variant }), className)} {...props}>
      {props.children}
    </span>
  );
};
