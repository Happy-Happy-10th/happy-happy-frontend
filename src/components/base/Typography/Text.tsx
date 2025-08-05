import { cn } from '@/utils/tailwind-utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, ElementType } from 'react';

export const textVariantList = {
  title1: 'text-7xl/[1.5] font-bold',
  title2: 'text-2xl/[1.5] lg:text-[calc(var(--text-xl)+2px)]/[1.5] font-bold',
  title3: 'text-xl/[1.5] lg:text-[calc(var(--text-xl)+2px)]/[1.5] font-bold',
  title4: 'text-lg/[1.5] lg:text-[calc(var(--text-xl)+2px)]/[1.5] font-bold',
  body1: 'text-xl/[1.5] lg:text-lg/[1.5] font-noraml', //body1 text
  body2: 'text-lg/[1.5] lg:text-md/[1.5] font-normal',
  body3: 'text-md/[1.5] font-normal',
  body4: 'text-sm/[1.5] font-normal',
  detail1: 'text-sm/[1.5] font-normal',
  detail2: 'text-xs/[1.5] font-normal',
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
