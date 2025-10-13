import { memo } from 'react';

const Profile = ({ name, role, imageUrl }: { name: string; role: string; imageUrl: string }) => {
  return (
    <div className="flex items-center gap-[14px]">
      <img
        src={imageUrl}
        alt={`${name}의 프로필 사진`}
        className="size-[62px] rounded-full object-cover"
      />
      <div>
        <div className="text-white">{name}</div>
        <div className="text-[var(--color-tertiary-text)] text-[13px]">{role}</div>
      </div>
    </div>
  );
};

export default memo(Profile);
