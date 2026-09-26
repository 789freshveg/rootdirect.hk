"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import { EmphasizedText } from "@/components/EmphasizedText";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t hairline">
      {faq.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b hairline">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-leaf md:py-7"
            >
              <span className="flex items-baseline gap-5">
                <span className="roman text-[11px] font-semibold tracking-[0.26em] text-olive">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[19px] font-bold leading-snug tracking-[0.04em] text-ink md:text-[23px]">
                  {item.q}
                </span>
              </span>
              <Plus
                size={20}
                className={`mt-1 shrink-0 text-olive transition-transform duration-500 ${
                  isOpen ? "rotate-45 text-leaf" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[52ch] pb-7 pl-0 text-[18px] leading-[2] text-ink/80 md:pl-[3.4rem]">
                  <EmphasizedText
                    text={item.a}
                    phrases={item.bold}
                    className="font-bold text-ink"
                  />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
