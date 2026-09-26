"use client";

import { useState } from "react";
import { payments } from "@/content/site";
import type { Payment } from "@/lib/data";
import { asset } from "@/lib/asset";
import { HighlightText } from "@/components/editorial";

export function PaymentTabs({ data }: { data: Payment[] }) {
  const methods = payments.methods.map((m) => {
    const found = data.find((d) => d.key === m.key);
    return {
      ...m,
      detail: found?.detail ? found.detail : m.detail,
      image: found?.image ?? "",
    };
  });
  const [active, setActive] = useState(methods[0].key);

  return (
    <div>
      <div
        role="tablist"
        aria-label="付款方式"
        className="flex flex-wrap gap-px border-b hairline"
      >
        {methods.map((m) => {
          const on = active === m.key;
          return (
            <button
              key={m.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(m.key)}
              className={`relative px-6 py-4 text-[16px] font-medium tracking-[0.12em] transition-colors md:px-8 ${
                on
                  ? "bg-brand text-white"
                  : "bg-transparent text-olive hover:text-ink"
              }`}
            >
              {m.name}
              <span
                className={`roman ml-2 text-[9px] uppercase tracking-[0.24em] ${
                  on ? "text-white/85" : "text-olive/70"
                }`}
              >
                {m.key}
              </span>
            </button>
          );
        })}
      </div>

      {methods.map((m) => (
        <div
          key={m.key}
          role="tabpanel"
          hidden={active !== m.key}
          className="grid gap-8 pt-8 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-5">
            <p className="eyebrow text-leaf">{m.name}</p>
            <p className="mt-5 max-w-[34ch] whitespace-pre-line text-[18px] leading-[2] text-ink/85">
              {m.detail ? (
                <HighlightText text={m.detail} target={payments.highlight} />
              ) : (
                "付款資料將於確認後提供，如有查詢請 WhatsApp 聯絡。［待補：帳戶資料／編號］"
              )}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="plate flex min-h-[240px] items-center justify-center border hairline bg-white p-4 md:min-h-[320px]">
              {m.image ? (
                <img
                  src={asset(m.image)}
                  alt={`${m.name} 付款說明`}
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              ) : (
                <div className="px-6 py-10 text-center">
                  <p className="roman text-[11px] uppercase tracking-[0.3em] text-olive">
                    {m.name} — image
                  </p>
                  <p className="mt-4 text-[16px] leading-[1.9] text-olive/80">
                    ［待上載：{m.name}付款截圖／QR Code
                    <br />
                    可於後台「付款資料」上載取代］
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
