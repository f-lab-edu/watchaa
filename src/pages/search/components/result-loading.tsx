const ResultLoading = () => {
  return (
    <ul className="pt-[22px] px-10">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="flex items-center gap-[14px] py-2 animate-pulse">
          <div className="size-12 bg-[var(--color-background30)] rounded-md" />
          <div className="flex flex-col gap-2">
            <div className="w-[200px] h-5 bg-[var(--color-background30)] rounded-md" />
            <div className="w-[100px] h-4 bg-[var(--color-background30)] rounded-md" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResultLoading;
