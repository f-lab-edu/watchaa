const TvIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.5 3.5v13h19v-13zM2 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9.25v2.5H7A.75.75 0 0 0 7 22h10a.75.75 0 0 0 0-1.5h-4.25V18H22a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
        clipRule="evenodd"
      />
      <path d="M10.36 7.41a.5.5 0 0 0-.76.43v4.84a.5.5 0 0 0 .76.43l4.03-2.42a.5.5 0 0 0 0-.86z" />
    </svg>
  );
};

export default TvIcon;
