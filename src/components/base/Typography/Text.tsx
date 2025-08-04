import { cn } from '@/utils/tailwind-utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, ElementType } from 'react';

export const textVariantList = {
  head1: 'text-3xl/[1.4] font-semibold',
  head2: 'text-2xl/[1.4] font-semibold',
  head3: 'text-xl/[1.4] font-semibold',
  head4: 'text-lg/[1.4] font-semibold',
  head5: 'text-[calc(var(--text-md)+2px)]/[1.4] font-semibold',
  head6: 'text-[calc(var(--text-md)+2px)]/[1.4] font-semibold',
  body1: 'text-md/[1.4] font-normal',
  body2: 'text-sm/[1.4] font-normal',
  body3: 'text-xs/[1.4] font-normal',
};

export const textVariants = cva('break-keep text-left', {
  variants: {
    variant: textVariantList,
  },
  defaultVariants: {
    variant: 'body1',
  },
});

interface BaseTextProps<T extends ElementType = 'span'> extends VariantProps<typeof textVariants> {
  component?: T;
}

export const Text = ({
  component,
  className,
  variant,
  ...props
}: BaseTextProps<ElementType> & ComponentProps<'span'>) => {
  const Component = component || 'span';
  return <Component className={cn(textVariants({ variant }), className)} {...props} />;
};
