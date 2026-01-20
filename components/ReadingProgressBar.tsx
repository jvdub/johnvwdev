"use client";

import { useEffect, useMemo, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type ReadingProgressBarProps = {
  targetSelector?: string;
  colorClass?: string;
  heightPx?: number;
  zIndexClass?: string;
};

export function ReadingProgressBar({
  targetSelector = "#post-content",
  colorClass = "bg-green-700",
  heightPx = 2,
  zIndexClass = "z-50",
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const containerStyle = useMemo(
    () => ({ height: `${heightPx}px` }),
    [heightPx],
  );

  useEffect(() => {
    let rafId = 0;
    let resizeObserver: ResizeObserver | undefined;

    const getTarget = () => document.querySelector<HTMLElement>(targetSelector);

    const measure = () => {
      const target = getTarget();
      if (!target) {
        setCanScroll(false);
        setProgress(0);
        return;
      }

      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const scrollable = target.scrollHeight - window.innerHeight;
      const nextCanScroll = scrollable > 1;

      if (!nextCanScroll) {
        setCanScroll(false);
        setProgress(0);
        return;
      }

      const raw = (window.scrollY - targetTop) / scrollable;
      const nextProgress = clamp(raw, 0, 1);

      setCanScroll(true);
      setProgress(nextProgress);

      if (!resizeObserver && typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(schedule);
        resizeObserver.observe(target);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
    };
  }, [targetSelector]);

  if (!canScroll || progress <= 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed left-0 right-0 top-0 ${zIndexClass} pointer-events-none`}
      style={containerStyle}
    >
      <div
        className={`${colorClass} opacity-90 transition-[width] duration-75`}
        style={{ height: "100%", width: `${progress * 100}%` }}
      />
    </div>
  );
}
