import type { Metadata } from "next";
import Link from "next/link";
import { delivery, orderFlow, payments, site } from "@/content/site";
import { getPayments } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Eyebrow, SectionTitle } from "@/components/editorial";
import { JotformFrame } from "@/components/JotformFrame";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "立即訂購｜填寫訂購表格 — 有種直送 Root Direct",
  description:
    "填寫有種直送訂購表格：選擇菜包方案、填寫收貨資料並上載付款截圖。星期一 20:00 截單，星期三清晨採摘，11:00–17:00 直送餐桌。",
};

const PAD = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

export default async function OrderFormPage() {
  const paymentData = await getPayments();

  const methods = payments.methods.map((m) => {
    const found = paymentData.find((d) => d.key === m.key);
    return { ...m, image: found?.image ?? "" };
  });

  return (
    <div className="bg-paper">
      {/* header */}
      <section className={`${PAD} pb-8 pt-24 md:pb-10 md:pt-32`}>
        <div className="grid items-end gap-5 md:grid-cols-12">
          <SectionTitle eyebrow="Order" level="h1" className="md:col-span-7">
            立即訂購
          </SectionTitle>
          <div className="md:col-span-4 md:col-start-9 md:pb-3">
            <p className="text-[18px] leading-[2] text-ink/85">
              填寫下方表格完成訂購。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/howtoorder"
                className="border border-soil px-5 py-3 text-center text-[14px] tracking-[0.08em] text-ink transition-colors hover:bg-soil hover:text-paper"
              >
                查看價格及訂購教學 →
              </Link>
              <a
                href={site.jotform}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand px-5 py-3 text-center text-[14px] tracking-[0.08em] text-white transition-colors hover:bg-deep"
              >
                新視窗開啟表格 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* form + summary — same top edge; form first on mobile */}
      <section className={`${PAD} pb-20 md:pb-28`}>
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-8">
          {/* FORM — first on mobile, right 8/12 on desktop */}
          <div className="order-1 md:order-2 md:col-span-8">
            <JotformFrame />
            <p className="mt-3 text-[16px] text-olive">
              如表格未能顯示，請
              <a
                href={site.jotform}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 border-b border-brand text-ink hover:text-brand"
              >
                按此開啟新視窗填寫
              </a>
              。
            </p>
          </div>

          {/* SUMMARY — after form on mobile, left 4/12 on desktop */}
          <aside className="order-2 md:order-1 md:col-span-4">
            <div className="md:pr-2">
              {/* delivery summary */}
              <div className="border border-[#d5e0c3] bg-[#F4F7EE] p-5">
                <Eyebrow>{delivery.en} — 運送</Eyebrow>
                <p className="mt-3 font-serif text-[20px] font-bold leading-[1.45] tracking-[0.03em] text-deep">
                  {delivery.headline}
                </p>
                <dl className="mt-4 space-y-3 border-t border-[#d5e0c3] pt-4">
                  {delivery.steps.map((s) => (
                    <div key={`${s.day}-${s.detail}`} className="flex gap-3">
                      <dt className="roman mt-1 w-9 shrink-0 text-[10px] font-semibold tracking-[0.2em] text-brand">
                        {s.day}
                      </dt>
                      <dd className="text-[16px] leading-[1.7] text-ink/85">
                        <span className="font-serif text-[17px] font-bold text-ink">
                          {s.label}
                        </span>
                        <br />
                        {s.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-4 space-y-1.5 border-t border-[#d5e0c3] pt-4">
                  {delivery.notes.slice(0, 3).map((n) => (
                    <li key={n} className="text-[14px] leading-[1.7] text-olive">
                      · {n}
                    </li>
                  ))}
                </ul>
              </div>

              {/* payment summary */}
              <div className="mt-5 border hairline bg-white p-5">
                <Eyebrow>{payments.en} — 付款</Eyebrow>
                <p className="mt-3 text-[15px] leading-[1.8] text-ink/85">
                  支援銀行轉賬、轉數快（FPS）及 PayMe。
                  <strong className="font-semibold text-brand">
                    {payments.highlight}
                  </strong>
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {methods.map((m) =>
                    m.image ? (
                      <figure key={m.key}>
                        <div className="aspect-square overflow-hidden border hairline bg-white">
                          <img
                            src={asset(m.image)}
                            alt={`${m.name} 付款說明`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <figcaption className="mt-1 text-center text-[12px] leading-tight text-olive">
                          {m.name}
                        </figcaption>
                      </figure>
                    ) : null,
                  )}
                </div>
                <Link
                  href="/howtoorder"
                  className="mt-4 block border-b border-brand pb-0.5 text-[15px] text-ink hover:text-brand"
                >
                  查看完整付款教學 →
                </Link>
              </div>

              {/* how to order */}
              <div className="mt-5 border hairline bg-white p-5">
                <Eyebrow>{orderFlow.en}</Eyebrow>
                <ol className="mt-3 space-y-2.5">
                  {orderFlow.steps.map((s) => (
                    <li key={s.n} className="flex gap-3">
                      <span className="roman mt-0.5 text-[11px] font-semibold tracking-[0.2em] text-brand">
                        {s.n}
                      </span>
                      <span className="text-[15px] leading-[1.7] text-ink/85">
                        <span className="font-serif text-[16px] font-bold text-ink">
                          {s.title}
                        </span>
                        <br />
                        {s.copy}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block bg-brand py-3.5 text-center text-[15px] tracking-[0.14em] text-white transition-colors hover:bg-deep"
              >
                WhatsApp 查詢菜包
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
