import type { Metadata } from "next";
import Link from "next/link";
import { payments, plans, site } from "@/content/site";
import { getPayments } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, HighlightText, SectionTitle } from "@/components/editorial";
import { PaymentTabs } from "@/components/PaymentTabs";
import { FAQ } from "@/components/FAQ";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "價格及訂購教學｜單次・月訂・長期 — 有種直送 Root Direct",
  description:
    "有種直送菜包價格：單次菜包 3/4/5/10 斤，月訂菜包連續四星期免運費，支援轉數快 FPS、PayMe 及銀行轉賬，星期三直送香港島、九龍及新界。",
};

const PAD = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

type Plan = {
  readonly name: string;
  readonly en: string;
  readonly note: string;
  readonly rows: readonly {
    readonly size: string;
    readonly gram: string;
    readonly price: string;
    readonly extra: string;
  }[];
};



function PlanTable({
  plan,
  tone,
  highlight,
}: {
  plan: Plan;
  tone: "paper" | "mint";
  highlight: string;
}) {
  const mint = tone === "mint";
  return (
    <div
      className={`flex h-full flex-col border p-6 md:p-9 ${
        mint ? "border-[#dce9ce] bg-[#eef6e4]" : "hairline bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[8vw] font-bold tracking-[0.05em] text-ink md:text-[2.4vw]">
          {plan.name}
        </h3>
        <span className="roman text-[10px] uppercase tracking-[0.26em] text-leaf">
          {plan.en}
        </span>
      </div>
      <p className="mt-3 text-[16px] leading-[1.8] text-olive">
        <HighlightText text={plan.note} target={highlight} />
      </p>

      <table className="mt-7 w-full border-collapse text-left">
        <thead>
          <tr className="roman text-[10px] uppercase tracking-[0.24em] text-olive">
            <th className="pb-2 font-semibold">Weight</th>
            <th className="pb-2 font-semibold">Price</th>
            <th className="pb-2 text-right font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          {plan.rows.map((r) => (
            <tr
              key={r.size}
              className={`border-t ${mint ? "border-[#cfe0ba]" : "hairline"}`}
            >
              <td className="py-4">
                <span className="font-serif text-[22px] font-bold tracking-[0.04em] text-ink md:text-[26px]">
                  {r.size}
                </span>
                <span className="roman ml-2 text-[11px] tracking-[0.14em] text-olive">
                  {r.gram}
                </span>
              </td>
              <td className="py-4 roman text-[22px] font-semibold text-leaf md:text-[26px]">
                {r.price}
              </td>
              <td className="py-4 text-right text-[16px] text-olive">
                <HighlightText text={r.extra} target={highlight} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function HowToOrderPage() {
  const [paymentData] = await Promise.all([getPayments()]);

  return (
    <div className="bg-paper">
      {/* header */}
      <section className={`${PAD} pb-10 pt-24 md:pb-16 md:pt-36`}>
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionTitle eyebrow="How to Order" level="h1">
              價格及訂購教學
            </SectionTitle>
            <p className="mt-6 max-w-[42ch] text-[18px] leading-[2] text-ink/85 md:text-[19px]">
              星期一 20:00 截單，
              <br />
              星期三清晨採摘，11:00–17:00 直送餐桌。
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pb-4">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Link
                href="/order"
                className="bg-brand px-7 py-3.5 text-[15px] tracking-[0.14em] text-white transition-colors hover:bg-deep"
              >
                立即訂購
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-soil px-7 py-3.5 text-[15px] tracking-[0.12em] text-ink transition-colors hover:bg-soil hover:text-paper"
              >
                WhatsApp 查詢
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* plans */}
      <section className={`${PAD} pb-16 md:pb-28`}>
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6">
            <PlanTable plan={plans.single} tone="paper" highlight="$50 運費" />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <PlanTable plan={plans.monthly} tone="mint" highlight="免運費" />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 border hairline bg-paper-2 p-6 md:mt-8 md:flex-row md:items-center md:p-9">
            <div>
              <h3 className="font-serif text-[26px] font-bold tracking-[0.05em] text-ink md:text-[32px]">
                {plans.longTerm.name}
                <span className="roman ml-3 text-[10px] uppercase tracking-[0.26em] text-leaf">
                  {plans.longTerm.en}
                </span>
              </h3>
              <p className="mt-2 max-w-[46ch] text-[17px] leading-[1.9] text-ink/80 md:text-[18px]">
                {plans.longTerm.note}
              </p>
            </div>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-brand px-8 py-4 text-[16px] tracking-[0.16em] text-white transition-colors hover:bg-deep"
            >
              WhatsApp 查詢
            </a>
          </div>
        </Reveal>
      </section>

      {/* Payment 付款教學 */}
      <section id="payment" className="border-y hairline bg-paper-2 py-16 md:py-28">
        <div className={PAD}>
          <SectionTitle eyebrow={payments.en}>{payments.title}</SectionTitle>
          <div className="mt-10">
            <PaymentTabs data={paymentData} />
          </div>
        </div>
      </section>

      {/* Order Form 填寫表格 — links to the dedicated /order form page */}
      <section className={`${PAD} py-16 md:py-24`}>
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle eyebrow="Order Form">填寫表格</SectionTitle>
            <p className="mt-5 max-w-[34ch] text-[19px] leading-[2] text-ink/85">
              選擇訂菜方案、填寫收貨資料並上載付款截圖，完成後我們會以
              WhatsApp 確認訂單。
            </p>
            <Link
              href="/order"
              className="mt-7 inline-block bg-brand px-10 py-4 text-[16px] tracking-[0.18em] text-white transition-colors hover:bg-deep"
            >
              立即訂購
            </Link>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Link
              href="/order"
              aria-label="前往訂購表格"
              className="group block overflow-hidden border hairline bg-white transition-colors hover:border-brand"
            >
              <img
                src="/images/howtoorder-form-preview.svg"
                alt="有種直送訂購表格預覽"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ 常見問題 */}
      <section className="border-t hairline bg-paper-2 py-16 md:py-24">
        <div className={PAD}>
          <div className="grid gap-8 md:grid-cols-12">
            <SectionTitle eyebrow="FAQ" className="md:col-span-3">
              常見問題
            </SectionTitle>
            <div className="md:col-span-8 md:col-start-5">
              <FAQ />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
