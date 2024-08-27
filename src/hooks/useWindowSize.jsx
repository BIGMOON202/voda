import { useState, useEffect } from "react";

export function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [width, setWidth] = useState(
    isWindowClient ? window.innerWidth : undefined
  );
  const [height, setHeight] = useState(
    isWindowClient ? window.innerWidth : undefined
  );

  useEffect(() => {
    function setSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    if (isWindowClient) {
      window.addEventListener("resize", setSize);

      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWidth, setHeight]);

  return [width, height];
}