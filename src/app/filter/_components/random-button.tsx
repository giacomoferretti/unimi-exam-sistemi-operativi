"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCcwIcon } from "lucide-react";
import { customAlphabet } from "nanoid";

const randomSeedGenerator = customAlphabet("1234567890abcdef", 8);

export const RandomSeedButton = ({ url }: { url: string }) => {
  const randomSeed = useMemo(() => randomSeedGenerator(), []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href={isClient ? `${url}${randomSeed}` : ""}
      className="inline-flex size-10 items-center justify-center whitespace-nowrap rounded-md border bg-white text-sm font-medium text-gray-900 ring-offset-white transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      <RefreshCcwIcon className="size-4" />
    </Link>
  );
};
