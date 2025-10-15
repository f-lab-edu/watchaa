import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

const Profile = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={cn('flex items-center gap-[14px]', className)}>
      {children}
    </div>
  );
};

const ProfileImage = ({
  src,
  alt,
  className,
  ...props
}: ComponentProps<'img'> & {
  src: string;
  alt: string;
}) => {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={cn(
        'size-[62px] rounded-full object-cover bg-[var(--color-background30)]',
        className,
      )}
    />
  );
};

const ProfileName = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={cn('text-white', className)}>
      {children}
    </div>
  );
};

const ProfileRole = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={cn('text-[var(--color-tertiary-text)] text-[13px]', className)}>
      {children}
    </div>
  );
};

Profile.Image = ProfileImage;
Profile.Name = ProfileName;
Profile.Role = ProfileRole;

export default Profile;
