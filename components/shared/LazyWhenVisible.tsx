"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyWhenVisibleProps = {
  children: ReactNode;
  /** Placeholder min-height to reduce CLS while waiting */
  minHeight?: string;
  /** Intersection root margin (prefetch before fully visible) */
  rootMargin?: string;
  /** Called once when the sentinel enters the viewport */
  onVisible?: () => void;
  className?: string;
};

export default function LazyWhenVisible({
  children,
  minHeight = "320px",
  rootMargin = "200px 0px",
  onVisible,
  className,
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        onVisible?.();
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin, onVisible]);

  return (
    <div ref={ref} className={className} style={!visible ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
