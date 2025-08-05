import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/tailwind-utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'bg-yoteyo-gray-100 flex justify-between gap-0 w-full items-center relative transition-[color] box-border border-2 rounded-xl',
  {
    variants: {
      variant: {
        default: 'border-[#eeeeee] ',
        focus: 'border-yoteyo-main',
        error: 'border-yoteyo-error',
        disabled:
          'border-[#eeeeee] [&_input]:placeholder:text-yoteyo-gray-200 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:text-lp-black-20 text-lp-black-20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type IconProps = {
  iconProps?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  };
};

function Input({
  className,
  type = 'text',
  variant,
  iconProps = {
    start: undefined,
    end: undefined,
  },
  inputClassName,
  ...props
}: VariantProps<typeof inputVariants> & React.ComponentProps<'input'> & IconProps & { inputClassName?: string }) {
  const { start, end } = iconProps;

  const [focus, setFocus] = React.useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleFocusOut = () => {
    setFocus(false);
  };

  return (
    <div
      className={cn(
        inputVariants({
          variant: focus ? (variant === 'error' ? 'error' : 'focus') : props.disabled ? 'disabled' : variant,
          ...props,
        }),
        className,
      )}
    >
      {start && <Slot className="mr-1">{start}</Slot>}
      <OriginInput
        className={inputClassName}
        type={type}
        {...props}
        onFocus={e => {
          handleFocus();
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onBlur={e => {
          handleFocusOut();
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
      />
      {end && <Slot className="mr-3">{end}</Slot>}
    </div>
  );
}

function OriginInput({ type, className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full h-full p-4 focus-visible:outline-none text-md/[1.5] font-normal placeholder:text-[#C0C0C0] placeholder:text-md/[1.5] placeholder:font-normal rounded-xl',
        className,
      )}
      autoComplete="off"
      {...props}
    />
  );
}

export { Input };
