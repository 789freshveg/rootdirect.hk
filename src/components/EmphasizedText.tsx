import type { ReactNode } from "react";

/** Render selected exact phrases in brand green and bold. */
export function EmphasizedText({
  text,
  phrases,
  className = "font-bold text-brand",
}: {
  text: string;
  phrases: readonly string[];
  className?: string;
}) {
  const targets = phrases.filter(Boolean).sort((a, b) => b.length - a.length);
  if (targets.length === 0) return <>{text}</>;

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${targets.map(escapeRegExp).join("|")})`, "g");
  const emphasis = new Set(targets);
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index): ReactNode =>
        emphasis.has(part) ? (
          <strong className={className} key={`${part}-${index}`}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
