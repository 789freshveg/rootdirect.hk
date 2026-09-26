import type { Metadata } from "next";
import { about, site } from "@/content/site";
import { getFarms } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionTitle } from "@/components/editorial";
import { EmphasizedText } from "@/components/EmphasizedText";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "關於有種直送｜睇得到的信任 — 有種直送 Root Direct",
  description:
    "源於對土地的疼惜，透過農夫故事與時令菜包，建立「睇得到的信任」，支持本地農業。",
};

const PAD = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

/** Farm-to-table rail imagery — same order as about.chain.stages. */
const chainImages = [
  { src: "images/farm.jpg", alt: "香港農田的整齊菜畦", height: "h-[34vh] md:h-[38vh]" },
  { src: "images/about-harvest.jpg", alt: "採收後的時令蔬菜", height: "h-[42vh] md:h-[54vh]" },
  { src: "images/veg-01.jpg", alt: "鋪在牛皮紙上的時令菜包內容", height: "h-[30vh] md:h-[32vh]" },
  { src: "images/about-table.jpg", alt: "木桌上的一頓本地菜晚餐", height: "h-[46vh] md:h-[62vh]" },
];

export default async function AboutPage() {
  const farms = await getFarms();

  return (
    <div className="bg-paper">
      {/* FARM TO TABLE ------------------------------------------ */}
      <section className="relative border-y hairline bg-paper-2 py-16 md:py-28">
        <div className={PAD}>
          <div className="flex items-center gap-4">
            <Eyebrow>{about.chain.title}</Eyebrow>
          </div>
          <p className="mt-4 font-serif text-[7vw] font-bold tracking-[0.06em] text-ink md:text-[2.4vw]">
            {about.chain.stages.map((stage) => stage.zh).join(" → ")}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 md:mt-16 md:overflow-visible">
          <div className="flex min-w-max gap-5 px-5 md:min-w-0 md:gap-8 md:px-10">
            {about.chain.stages.map((stage, i) => {
              const image = chainImages[i];
              return (
                <Reveal
                  key={stage.zh}
                  delay={i * 0.09}
                  className="w-[62vw] shrink-0 md:w-auto md:flex-1"
                >
                  <div className={`plate relative w-full overflow-hidden ${image.height}`}>
                    <img
                      src={asset(image.src)}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="hairline mt-4 flex items-baseline justify-between border-t pt-3">
                    <span className="font-serif text-[22px] font-bold tracking-[0.08em] text-ink md:text-[26px]">
                      {stage.zh}
                    </span>
                    <span className="roman text-[10px] uppercase tracking-[0.28em] text-olive">
                      {stage.en}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNER FARMS ------------------------------------------ */}
      <section className="relative py-16 md:py-28">
        <div className={PAD}>
          <div className="border-b hairline pb-6">
            <div className="flex items-center gap-4">
              <Eyebrow>{about.farms.en}</Eyebrow>
            </div>
            <SectionTitle level="h2" className="mt-3">
              {about.farms.title}
            </SectionTitle>
          </div>

          {farms.length === 0 ? (
            <p className="mt-10 max-w-[46ch] text-[18px] leading-[2] text-ink/70">
              {about.farms.empty}
            </p>
          ) : (
            <div className="mt-12 space-y-16 md:mt-20 md:space-y-28">
              {farms.map((farm, i) => (
                <Reveal key={farm.id}>
                  <article className="grid items-start gap-6 md:grid-cols-12 md:gap-10">
                    <div
                      className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2 md:col-start-9" : ""}`}
                    >
                      <h3 className="mt-3 font-serif text-[8vw] font-bold leading-[1.3] tracking-[0.04em] text-ink md:text-[2.6vw]">
                        {farm.name}
                      </h3>
                      <div className="hairline mt-5 border-t" />
                      <p className="mt-5 max-w-[42ch] whitespace-pre-line text-[17px] leading-[1.9] text-ink/80 md:text-[18px]">
                        <EmphasizedText
                          text={farm.description}
                          phrases={about.farms.highlight}
                          className="font-bold text-ink"
                        />
                      </p>
                    </div>

                    <div
                      className={`grid grid-cols-2 gap-4 md:col-span-7 ${
                        i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-6"
                      }`}
                    >
                      <div className="plate relative aspect-[4/5] overflow-hidden">
                        <img
                          src={asset(farm.images[0] ?? "images/farm.jpg")}
                          alt={`${farm.name} 農場環境`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="plate relative mt-8 aspect-[4/5] overflow-hidden md:mt-16">
                        <img
                          src={asset(farm.images[1] ?? "images/veg-02.jpg")}
                          alt={`${farm.name} 當季作物`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REGENERATIVE — 再生農耕 ----------------------------------- */}
      <section className="relative border-y hairline bg-paper-2 py-16 md:py-28">
        <div className={PAD}>
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <Eyebrow>{about.regenerative.caption}</Eyebrow>
                <h3 className="mt-3 font-serif text-[8vw] font-bold leading-[1.3] tracking-[0.04em] text-ink md:text-[2.4vw]">
                  {about.regenerative.heading}
                </h3>
                <div className="hairline mt-5 border-t" />
                <div className="mt-6 space-y-4">
                  {about.regenerative.body.map((line) => (
                    <p
                      key={line}
                      className="max-w-[40ch] text-[17px] leading-[1.95] text-ink/80 md:text-[18px]"
                    >
                      <EmphasizedText
                        text={line}
                        phrases={[about.regenerative.highlight]}
                        className="font-bold text-brand"
                      />
                    </p>
                  ))}
                </div>
                <a
                  href={about.regenerative.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-baseline gap-3 border-b border-brand pb-1 text-[16px] tracking-[0.08em] text-ink transition-colors hover:text-brand"
                >
                  {about.regenerative.linkLabel}
                  <span className="roman text-[11px] uppercase tracking-[0.2em] text-olive">
                    {about.regenerative.linkNote} ↗
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7 md:gap-6">
                {about.regenerative.images.map((image, i) => (
                  <figure key={image.src} className={i === 1 ? "mt-8 md:mt-16" : ""}>
                    <div className="plate relative aspect-[4/5] overflow-hidden">
                      <img
                        src={asset(image.src)}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="hairline mt-3 border-t pt-2.5 text-[14px] tracking-[0.04em] text-olive">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEANING · compact banner ------------------------------- */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-soil text-paper md:h-[500px]">
        <div className="plate-mono absolute inset-0">
          <img
            src={asset("images/about-seed.jpg")}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-soil via-soil/85 to-soil/35" />

        <div className={`relative w-full ${PAD} py-10 md:py-0`}>
          <div className="flex items-center gap-4">
            <Eyebrow tone="paper">{about.meaning.caption}</Eyebrow>
          </div>

          <div className="mt-6 grid items-center gap-6 md:mt-8 md:grid-cols-12 md:gap-10">
            {/* 有種 — sized to its column so both characters always show in full */}
            <Reveal y={32} className="md:col-span-5">
              <span className="block whitespace-nowrap font-serif text-[clamp(88px,28vw,160px)] font-black leading-none tracking-[0.04em] text-paper md:text-[clamp(112px,14vw,232px)]">
                {about.meaning.glyph}
              </span>
            </Reveal>

            <div className="md:col-span-7">
              <dl>
                {about.meaning.rows.map((row, i) => (
                  <div
                    key={row.term}
                    className={`flex items-baseline gap-5 py-4 md:gap-8 ${
                      i === 0 ? "border-b border-paper/25" : ""
                    }`}
                  >
                    <dt className="w-[2.4em] shrink-0 font-serif text-[30px] font-bold leading-none text-lime md:text-[38px]">
                      {row.term}
                    </dt>
                    <dd className="text-[19px] leading-[1.8] text-paper/90 md:text-[22px]">
                      {row.def}
                    </dd>
                  </div>
                ))}
              </dl>
              <Reveal delay={0.12}>
                <p className="mt-5 border-l-2 border-lime/70 pl-5 text-[16px] leading-[1.9] text-paper/75 md:text-[17px]">
                  {about.meaning.note}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US · brand spread ------------------------------ */}
      <section className="relative pb-16 pt-14 md:pb-24 md:pt-20">
        <div className={PAD}>
          <div className="flex items-center gap-4">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-khaki/70" />
          </div>

          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-5">
              <h1 className="font-serif text-[16vw] font-black leading-[0.95] tracking-[0.04em] text-ink sm:text-[11vw] md:text-[5.4vw]">
                {about.title}
              </h1>
              <p className="roman mt-5 text-[12px] font-semibold uppercase tracking-[0.44em] text-leaf">
                {about.titleEn}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-2">
              <p className="font-serif text-[20px] font-medium leading-[1.8] tracking-[0.02em] text-ink md:text-[25px]">
                {about.intro.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* 農夫故事・時令菜包・睇得到的信任 — the brand in three pillars */}
          <Reveal delay={0.15}>
            <ol className="mt-12 grid border-t hairline md:mt-16 md:grid-cols-3 md:border-b">
              {about.intro.pillars.map((pillar, i) => (
                <li
                  key={pillar.zh}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b hairline py-5 md:border-b-0 md:py-8 ${
                    i > 0 ? "md:border-l md:pl-8" : ""
                  } ${i < about.intro.pillars.length - 1 ? "md:pr-8" : ""}`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-serif text-[22px] font-bold tracking-[0.06em] text-ink lg:text-[26px]">
                      {pillar.zh}
                    </span>
                  </span>
                  <span className="roman text-[10px] uppercase tracking-[0.24em] text-olive">
                    {pillar.en}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ORIGIN · 連結「有心種 × 有心買」 ------------------------- */}
      <section className="relative pb-16 pt-8 md:pb-32 md:pt-16">
        <div className="grid items-center md:grid-cols-12">
          <Reveal className="plate relative md:col-span-7">
            <img
              src={asset("images/about-land.jpg")}
              alt="暴雨過後，農田裡浸水的南瓜"
              className="h-[48vh] w-full object-cover md:h-[78vh]"
            />
            <p className="absolute bottom-3 left-4 md:left-6">
              <span className="roman bg-paper/85 px-2 py-1 text-[10px] uppercase tracking-[0.26em] text-olive">
                暴雨後的農田 — 新界
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative z-10 -mt-10 bg-paper px-5 py-10 md:col-span-5 md:-ml-[27%] md:mt-0 md:px-12 md:py-16"
          >
            <div className="flex items-center gap-4">
              <Eyebrow>{about.why.caption}</Eyebrow>
            </div>
            <h2 className="mt-6 font-serif text-[7.4vw] font-bold leading-[1.36] tracking-[0.02em] text-ink md:text-[2.7vw]">
              {about.why.heading}
            </h2>
            <div className="mt-7 max-w-[34ch]">
              {about.why.body.map((line, i) => (
                <p
                  key={line}
                  className={`text-[18px] leading-[2] ${
                    i === about.why.body.length - 1 ? "mt-4 text-ink" : "text-ink/80"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* BELIEF -------------------------------------------------- */}
      <section className="relative py-16 md:py-32">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-0">
          <Reveal className="px-5 md:col-span-5 md:pl-10 md:pr-0">
            <div className="flex items-center gap-4">
              <Eyebrow>{about.belief.caption}</Eyebrow>
            </div>
            <h2 className="mt-6 font-serif text-[10vw] font-black leading-[1.08] tracking-[0.04em] text-ink md:text-[3.6vw]">
              {about.belief.heading}
            </h2>
            <div className="hairline mt-8 border-t" />
            <div className="mt-7 max-w-[32ch] space-y-5">
              {about.belief.body.map((line, i) => (
                <p
                  key={line}
                  className={`text-[18px] leading-[2] ${i === 0 ? "text-ink" : "text-ink/85"}`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* see the farm days for yourself */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 border border-soil px-6 py-3.5 text-[15px] tracking-[0.12em] text-ink transition-colors hover:bg-soil hover:text-paper sm:w-auto"
              >
                <InstagramIcon size={17} />
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 border border-soil px-6 py-3.5 text-[15px] tracking-[0.12em] text-ink transition-colors hover:bg-soil hover:text-paper sm:w-auto"
              >
                <FacebookIcon size={17} />
                Facebook
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="plate md:col-span-7">
            <img
              src={asset("images/about-harvest.jpg")}
              alt="清晨採收後，疊放在田邊的菜筐"
              className="h-[46vh] w-full object-cover md:h-[80vh]"
            />
          </Reveal>
        </div>
      </section>

    </div>
  );
}
