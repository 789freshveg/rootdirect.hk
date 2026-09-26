import type { Metadata } from "next";
import Link from "next/link";
import {
  delivery,
  farmStory,
  items,
  orderBand,
  seasonal,
  site,
} from "@/content/site";
import { getGallery, getHeroImages, getProducts, getSeasonal } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Hero } from "@/components/Hero";

import { Reveal } from "@/components/Reveal";
import { Eyebrow, HighlightText, SectionTitle } from "@/components/editorial";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { EmphasizedText } from "@/components/EmphasizedText";

/** PNG line icons — swap the file in /public/icons on GitHub to update. */
const deliveryIcons = [
  "/icons/delivery-cutoff.png",
  "/icons/delivery-harvest.png",
  "/icons/delivery-dispatch.png",
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: [...site.keywords],
};

const PAD = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

export default async function HomePage() {
  const [heroImages, current, next, gallery, products] = await Promise.all([
    getHeroImages(),
    getSeasonal("current"),
    getSeasonal("next"),
    getGallery(),
    getProducts(),
  ]);

  return (
    <div className="bg-paper">
      <Hero images={heroImages} />

      {/* 11月出產 ---------------------------------------------------- */}
      <section className={`${PAD} py-16 md:py-28`}>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <SectionTitle eyebrow={seasonal.en}>{seasonal.title}</SectionTitle>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/order"
                className="bg-brand px-7 py-3.5 text-[15px] font-medium tracking-[0.14em] text-white transition-colors hover:bg-deep"
              >
                立即訂購
              </Link>
              <Link
                href="/howtoorder"
                className="border border-soil px-7 py-3.5 text-[15px] tracking-[0.14em] text-ink transition-colors hover:bg-soil hover:text-paper"
              >
                查看價格及訂購教學
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5 md:col-start-8 md:pb-2">
            <p className="max-w-[34ch] text-[19px] leading-[2] text-ink md:text-[20px]">
              <HighlightText
                text={seasonal.currentCopy}
                target={seasonal.highlight}
              />
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-8">
          {current.map((v, i) => (
            <Reveal
              key={v.id}
              delay={(i % 4) * 0.07}
              className={i % 2 === 1 ? "md:mt-14" : ""}
            >
              <figure>
                <div className="plate relative aspect-[4/5] overflow-hidden">
                  <img
                    src={asset(v.src)}
                    alt={v.name}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="hairline mt-3 flex items-baseline justify-between border-t pt-3">
                  <span className="font-serif text-[20px] font-bold tracking-[0.08em] text-ink md:text-[24px]">
                    {v.name}
                  </span>
                  <span className="roman text-[10px] tracking-[0.24em] text-olive">
                    IN SEASON
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
          {current.length === 0 && (
            <p className="col-span-full text-[18px] text-olive">
              本季菜款整理中，請留意 Instagram 及 Facebook。
            </p>
          )}
        </div>

        <p className="mt-8 border-l-2 border-lime pl-5 text-[16px] leading-[1.9] text-olive">
          菜包內容或因天氣及收成調整，詳情請留意
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 border-b border-brand text-ink hover:text-brand"
          >
            Instagram
          </a>
          、
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 border-b border-brand text-ink hover:text-brand"
          >
            Facebook
          </a>
          或
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 border-b border-brand text-ink hover:text-brand"
          >
            WhatsApp
          </a>
          查詢。
        </p>

        {/* 獨立菜款 — 與菜包重疊的菜款，可單獨購買 ---------------------- */}
        <div className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-5">
            <SectionTitle eyebrow={items.en} level="h3">
              {items.title}
            </SectionTitle>
            <p className="max-w-[36ch] text-[19px] leading-[2] text-ink md:text-[20px]">
              {items.note}
            </p>
          </div>

          {/* first four — larger highlight thumbnails */}
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <figure>
                  <div className="plate relative aspect-square overflow-hidden bg-white">
                    <img
                      src={asset(p.src)}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="hairline mt-3 flex items-baseline justify-between gap-2 border-t pt-2.5">
                    <span className="font-serif text-[19px] font-bold tracking-[0.05em] text-ink md:text-[21px]">
                      {p.name}
                    </span>
                    <span className="roman text-[15px] font-semibold text-leaf md:text-[16px]">
                      {p.price}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* the rest — compact 100px thumbnails, three per row */}
          {products.length > 4 && (
            <ul className="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(4).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-4 border-b hairline pb-4"
                >
                  <div className="plate h-[100px] w-[100px] shrink-0 overflow-hidden bg-white">
                    <img
                      src={asset(p.src)}
                      alt={p.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[18px] font-bold tracking-[0.04em] text-ink">
                      {p.name}
                    </p>
                    <p className="roman mt-1 text-[16px] font-semibold text-leaf">
                      {p.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {products.length === 0 && (
            <p className="py-6 text-[17px] text-olive">
              獨立菜款整理中，請 WhatsApp 查詢。
            </p>
          )}
        </div>

        {next.length > 0 && (
          <div className="mt-16 md:mt-24">
            <SectionTitle eyebrow="Next Month">
              {seasonal.nextLabel}
            </SectionTitle>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-x-8">
              {next.map((v) => (
                <figure key={v.id}>
                  <div className="plate relative aspect-[5/4] overflow-hidden opacity-90">
                    <img
                      src={asset(v.src)}
                      alt={v.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 font-serif text-[18px] font-bold tracking-[0.08em] text-ink">
                    {v.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}



      </section>

      {/* rule between 下月預告 and 睇得到的信任 */}
      <div className={PAD}>
        <div className="hairline border-t" />
      </div>

      {/* 農場故事 / Instagram ---------------------------------------- */}
      <section className={`${PAD} py-16 md:py-28`}>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <SectionTitle eyebrow={farmStory.en}>{farmStory.title}</SectionTitle>
            <p className="mt-5 text-[18px] leading-[2] text-ink/85 md:text-[19px]">
              探索農場故事，
              <br />
              見證蔬菜生長與農夫日常。
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:col-start-9 md:flex-col md:items-end"
          >
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 border border-soil px-6 py-3.5 text-[15px] tracking-[0.12em] text-ink transition-colors hover:bg-soil hover:text-paper sm:w-auto md:w-full"
            >
              <InstagramIcon size={17} />
              Instagram
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 border border-soil px-6 py-3.5 text-[15px] tracking-[0.12em] text-ink transition-colors hover:bg-soil hover:text-paper sm:w-auto md:w-full"
            >
              <FacebookIcon size={17} />
              Facebook
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 md:mt-14 md:grid-cols-4 md:gap-3">
          {gallery.map((g, i) => (
            <Reveal key={g.id} delay={(i % 4) * 0.06}>
              <div className="plate group relative aspect-square overflow-hidden">
                <img
                  src={asset(g.src)}
                  alt={g.caption || "農場日常"}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-soil/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="p-3 text-[14px] text-paper">{g.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 運送安排 ----------------------------------------------------- */}
      <section className="border-y hairline bg-[#F4F7EE] py-10 md:py-14">
        <div className={PAD}>
          <Eyebrow>{delivery.en}</Eyebrow>

          <Reveal>
            <h2 className="mt-4 font-serif text-[4.6vw] font-bold leading-[1.4] tracking-[0.01em] text-deep sm:whitespace-nowrap md:text-[1.9vw]">
              {delivery.headline}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
            {delivery.steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-full items-center gap-4 border border-[#d5e0c3] bg-white p-5 md:p-6">
                  <img
                    src={deliveryIcons[i]}
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 md:h-12 md:w-12"
                  />
                  <div>
                    <span className="roman block text-[13px] font-semibold tracking-[0.3em] text-brand">
                      {s.day}
                    </span>
                    <p className="mt-1 font-serif text-[25px] font-bold tracking-[0.05em] text-deep md:text-[28px]">
                      {s.label}
                    </p>
                    <p className="mt-1 text-[19px] font-medium leading-[1.7] text-deep md:text-[20px]">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-7 grid gap-x-12 gap-y-3 border-t border-[#d5e0c3] pt-6 md:mt-9 md:grid-cols-2">
            <ul className="space-y-3">
              {[delivery.notes[1], delivery.notes[2], delivery.notes[3]].map((note, i) => (
                <li key={note} className="flex gap-3 text-[17px] leading-[1.9] text-deep md:text-[18px]">
                  <span className="mt-[0.95em] h-px w-4 shrink-0 bg-brand" />
                  <span>
                    <EmphasizedText
                      text={note}
                      phrases={[
                        "香港島、九龍及新界。",
                        "電話／WhatsApp 通知",
                        "大廈管理處",
                        "停車處自取",
                      ]}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 md:border-l md:border-[#d5e0c3] md:pl-8">
              {[delivery.notes[0], delivery.notes[4]].map((note) => (
                <li key={note} className="flex gap-3 text-[17px] leading-[1.9] text-deep md:text-[18px]">
                  <span className="mt-[0.95em] h-px w-4 shrink-0 bg-brand" />
                  <span>
                    {note.includes("WhatsApp 另議") ? (
                      <>
                        {note.split("WhatsApp 另議")[0]}
                        <a
                          href={site.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-brand font-bold text-brand"
                        >
                          WhatsApp 另議
                        </a>
                        {note.split("WhatsApp 另議")[1]}
                      </>
                    ) : (
                      <EmphasizedText text={note} phrases={["順延至星期四"]} />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ORDER BAND — same compact band as the former About closing --- */}
      <section className="relative overflow-hidden">
        <div className="plate absolute inset-0">
          <img
            src={asset("images/about-table.jpg")}
            alt="木桌上以時令蔬菜煮成的一頓飯"
            className="h-full w-full object-cover object-[55%_60%]"
          />
        </div>
        <div className="absolute inset-0 bg-soil/78" />

        <div className={`relative ${PAD} py-12 md:py-16`}>
          <Eyebrow tone="paper">{orderBand.eyebrow}</Eyebrow>

          <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-7">
              <p className="font-serif text-[7.4vw] font-black leading-[1.3] tracking-[0.03em] text-paper sm:text-[5.6vw] md:text-[3vw]">
                {/* wrap only at the comma, never mid-phrase */}
                {orderBand.statement.split("，").map((part, i, parts) => (
                  <span key={part} className="inline-block whitespace-nowrap">
                    {part}
                    {i < parts.length - 1 ? "，" : ""}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-5">
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/order"
                  className="bg-brand px-8 py-4 text-center text-[16px] tracking-[0.16em] text-white transition-colors hover:bg-lime hover:text-soil"
                >
                  {orderBand.cta}
                </Link>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-paper/45 px-8 py-4 text-center text-[16px] tracking-[0.16em] text-paper transition-colors hover:border-lime hover:text-lime"
                >
                  WhatsApp 查詢菜包
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
