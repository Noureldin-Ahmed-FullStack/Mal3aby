
export const NiceDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={'text-zinc-800 dark:text-zinc-100 w-full transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border '+className}>
      {children}
    </div>
  )
}