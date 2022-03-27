import { useEffect, useState } from "react";

const MOBILE_BREAK_POINT = 768;

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(true);
  const [viewHeight, setViewHeight] = useState<null | number>(null);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAK_POINT);
      setViewHeight(window.innerHeight);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      onResize();
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { viewHeight, isMobile };
}
