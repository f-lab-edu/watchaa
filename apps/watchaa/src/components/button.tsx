import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  priority?: 'primary' | 'secondary' | 'tertiary';
};

// TODO. size prop 추가 고려
const Button = ({
  children,
  type = 'button',
  priority = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'text-white rounded text-[15px]',
        {
          'bg-[var(--color-primary10)] hover:bg-[var(--color-primary40)]': priority === 'primary',
          'bg-[var(--color-opacity15)] hover:bg-[var(--color-opacity30)]': priority === 'secondary',
          'bg-[var(--color-black-opacity30)] hover:bg-[var(--color-black-opacity10)]':
            priority === 'tertiary',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
