"use client";

import { useRouter } from "next/navigation";
import { RefreshCcwIcon } from "lucide-react";

export function ReloadPageButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      className="mt-16 inline-flex size-10 items-center justify-center whitespace-nowrap rounded-md border bg-white text-sm font-medium text-gray-900 ring-offset-white transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      <RefreshCcwIcon className="size-4" />
    </button>
  );
}
