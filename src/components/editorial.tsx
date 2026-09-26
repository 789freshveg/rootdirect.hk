import type { ReactNode } from "react";

/** Folio number in the booklet margin. */
export function Folio({
  n,
  tone = "ink",
}: {
  n: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      className={`roman text-[11px] font-semibold tracking-[0.3em] ${
        tone === "paper" ? "text-paper/60" : "text-olive"
      }`}
    >
      {n}
    </span>
  );
}

export function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "paper" | "brand";
  className?: string;
}) {
  const color =
    tone === "paper"
      ? "text-paper/70"
      : tone === "brand"
        ? "text-leaf"
        : "text-olive";
  return <span className={`eyebrow ${color} ${className}`}>{children}</span>;
}

/**
 * Unified section heading used across every page so all titles share the
 * same eyebrow position, type scale, colour and spacing.
 *
 *   level "h1"  — page title      (價格及訂購教學 / 有種直送)
 *   level "h2"  — section title   (11月出產, 菜包款式, 常見問題 …)
 *   level "h3"  — sub-section     (下月預告, 獨立菜款 …)
 */
export function SectionTitle({
  eyebrow,
  children,
  level = "h2",
  tone = "brand",
  className = "",
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
  level?: "h1" | "h2" | "h3";
  tone?: "brand" | "ink" | "paper";
  className?: string;
}) {
  const size =
    level === "h1"
      ? "text-[12vw] sm:text-[9vw] md:text-[5.4vw]"
      : level === "h2"
        ? "text-[10vw] md:text-[3.6vw]"
        : "text-[8vw] md:text-[2.6vw]";

  const colour =
    tone === "paper" ? "text-paper" : tone === "ink" ? "text-ink" : "text-brand";

  const Tag = level;

  return (
    <div className={className}>
      {eyebrow ? (
        <Eyebrow tone={tone === "paper" ? "paper" : "ink"}>{eyebrow}</Eyebrow>
      ) : null}
      <Tag
        className={`font-serif font-black leading-[1.08] tracking-[0.04em] ${size} ${colour} ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}

/** Small vertical caption running down the gutter, like a printed booklet. */
export function VerticalCaption({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      className={`vertical hidden text-[11px] tracking-[0.3em] lg:block ${
        tone === "paper" ? "text-paper/55" : "text-olive"
      }`}
      style={{ fontFamily: '"Noto Sans TC", sans-serif' }}
    >
      {children}
    </span>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`hairline border-0 border-t ${className}`} />;
}

/**
 * Renders `text` with `target` emphasised in brand green.
 * Used for key commercial information (3 款以上 / 免運費 / + $50 運費).
 */
export function HighlightText({
  text,
  target,
  className = "font-semibold text-brand",
}: {
  text: string;
  target: string;
  className?: string;
}) {
  const i = text.indexOf(target);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <strong className={className}>{target}</strong>
      {text.slice(i + target.length)}
    </>
  );
}
