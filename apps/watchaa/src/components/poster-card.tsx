import { cn } from '@/utils/cn';
import { ComponentProps, memo } from 'react';

type PosterCardProps = ComponentProps<'div'> & {
  title: string;
  imageUrl: string;
};

const PosterCard = ({ title, imageUrl, className, ...props }: PosterCardProps) => {
  return (
    <div {...props} className={cn('overflow-hidden cursor-pointer rounded', className)}>
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="size-full object-cover bg-[var(--color-background30)]"
      />
    </div>
  );
};

export default memo(PosterCard);
