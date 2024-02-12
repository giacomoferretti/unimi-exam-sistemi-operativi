export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[12rem] w-[36rem] items-center justify-center rounded-3xl border bg-white p-8 shadow-xl">
      {children}
    </div>
  );
}
