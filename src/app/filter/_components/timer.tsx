"use client";

import { useEffect, useRef, useState } from "react";

const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(() => undefined);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay ?? 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};

export const Timer = () => {
  const start = useRef(Date.now());
  const [current, setCurrent] = useState<number>(Date.now());

  useInterval(() => {
    setCurrent(Date.now());
  }, 1000);

  return (
    <>
      <span className="font-semibold text-gray-900">
        {new Date(current - start.current).toISOString().substr(11, 8)}
      </span>
    </>
  );
};
