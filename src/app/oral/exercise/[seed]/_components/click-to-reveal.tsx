"use client";

import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";

import { cn } from "~/utils";

export const ClickToReveal = ({
  children,
  show,
  setShow,
}: {
  children: React.ReactNode;
  show?: boolean;
  setShow?: (show: boolean) => void;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    if (setShow) {
      setShow(true);
    } else {
      setIsRevealed(true);
    }
  };

  useEffect(() => {
    if (show !== undefined) {
      setIsRevealed(show);
    }
  }, [show]);

  return (
    <div
      onClick={handleClick}
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
