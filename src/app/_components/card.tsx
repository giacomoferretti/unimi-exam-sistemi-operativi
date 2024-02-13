export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center border bg-white px-16 py-8 shadow sm:w-[36rem] sm:rounded-md">
      {children}
    </div>
  );
}
