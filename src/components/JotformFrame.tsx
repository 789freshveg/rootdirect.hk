"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const INITIAL_HEIGHT = 3000;
const MIN_HEIGHT = 1000;
const MAX_HEIGHT = 9000;

/** Jotform's isIframeEmbed mode reports content height via setHeight:NNNN. */
export function JotformFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  const src = new URL(site.jotform);
  src.searchParams.set("isIframeEmbed", "1");

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const host = new URL(event.origin).hostname;
        if (!host.endsWith("jotform.com")) return;
      } catch {
        return;
      }

      let reported: number | undefined;
      if (typeof event.data === "string") {
        const match = event.data.match(/(?:^|\b)setHeight:\s*(\d+)/i);
        if (match) reported = Number(match[1]);
      } else if (event.data && typeof event.data === "object") {
        const data = event.data as Record<string, unknown>;
        const raw = data.iframeHeight ?? data.formHeight ?? data.height;
        const parsed = typeof raw === "number" ? raw : Number(raw);
        if (Number.isFinite(parsed)) reported = parsed;
      }

      if (reported === undefined || !Number.isFinite(reported)) return;
      const next = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, Math.ceil(reported)));
      setHeight((current) => (Math.abs(current - next) > 12 ? next : current));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="overflow-hidden border hairline bg-white">
      <iframe
        ref={frameRef}
        title="有種直送 訂購表格"
        src={src.toString()}
        loading="lazy"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="block w-full border-0"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
