"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

type MdxPreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

const COPY_RESET_DELAY_MS = 1800;

export function MdxPre({ children, className, "data-language": dataLanguage, ...props }: MdxPreProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const language = typeof dataLanguage === "string" && dataLanguage.trim().length > 0 ? dataLanguage : "plaintext";

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetCopyState = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopyState("idle");
      timeoutRef.current = null;
    }, COPY_RESET_DELAY_MS);
  };

  const handleCopy = async () => {
    const codeElement = preRef.current?.querySelector("code");
    const text = codeElement?.textContent ?? "";

    if (text.length === 0) {
      setCopyState("error");
      resetCopyState();
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    resetCopyState();
  };

  const buttonLabel =
    copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy failed" : "Copy";

  return (
    <pre ref={preRef} className={className} data-language={language} {...props}>
      <span className="mdx-code-toolbar">
        <span className="mdx-code-language">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="mdx-code-copy-button"
          aria-label={buttonLabel}
          title={buttonLabel}
        >
          {copyState === "copied" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : copyState === "error" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="9" y="9" width="10" height="10" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2" />
            </svg>
          )}
          <span className="sr-only">{buttonLabel}</span>
        </button>
      </span>
      {children}
    </pre>
  );
}