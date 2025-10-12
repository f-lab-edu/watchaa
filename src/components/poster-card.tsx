import { cn } from '@/utils/cn';
import { ComponentProps, memo } from 'react';
import { Link } from 'react-router-dom';

type PosterCardProps = ComponentProps<'div'> & {
  title: string;
  imageUrl: string;
  to: string;
};

const PosterCard = ({ title, imageUrl, to, className, ...props }: PosterCardProps) => {
  return (
    <div {...props} className={cn('overflow-hidden cursor-pointer rounded hover:brightness-80', className)}>
      <Link to={to}>
        <img src={imageUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
      </Link>
    </div>
  );
};

export default memo(PosterCard);
