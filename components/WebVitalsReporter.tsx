"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";
import { onCLS, onFID, onLCP, onTTFB } from "web-vitals";

type GtagFunction = (...args: any[]) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFunction;
};

const isDev = process.env.NODE_ENV !== "production";

function sendToGoogleAnalytics(metric: Metric) {
  if (typeof window === "undefined") return;

  const gtag = (window as WindowWithGtag).gtag;
  if (typeof gtag !== "function") return;

  const value =
    metric.name === "CLS"
      ? Math.round(metric.value * 1000)
      : Math.round(metric.value);

  gtag("event", metric.name, {
    event_category: "Web Vitals",
    event_label: metric.id,
    value,
    non_interaction: true,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
  });

  if (isDev) {
    console.debug("[ga] web-vitals", {
      name: metric.name,
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
    });
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    onCLS(sendToGoogleAnalytics);
    onFID(sendToGoogleAnalytics);
    onLCP(sendToGoogleAnalytics);
    onTTFB(sendToGoogleAnalytics);
  }, []);

  return null;
}
