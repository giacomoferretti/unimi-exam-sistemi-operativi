"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";

import { cn } from "~/utils";

export const ClickToReveal = ({ children }: { children: React.ReactNode }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      onClick={() => {
        setIsRevealed(true);
      }}
      className={cn("relative", { "cursor-pointer": !isRevealed })}>
      {children}

      {!isRevealed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 text-white backdrop-blur">
          <EyeIcon className="size-12 drop-shadow" />
          <span className="text-lg font-semibold drop-shadow">
            Visualizza soluzione
          </span>
        </div>
      )}
    </div>
  );
};
