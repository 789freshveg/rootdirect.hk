"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { hero, sellingPoints } from "@/content/site";

/** Full-bleed hero with a continuous, infinite crossfade between images. */
export function Hero({
  images,
}: {
  images: { id: number; src: string; alt: string }[];
}) {
  const list = images.length > 0 ? images : [{ id: 0, src: "images/hero-01.jpg", alt: "香港農田" }];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length < 2) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      6000,
    );
    return () => window.clearInterval(t);
  }, [list.length]);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-soil md:h-[94vh]">
      {list.map((img, i) => (
        <div
          key={img.id}
          className="plate absolute inset-0 transition-opacity duration-[2200ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <img
            src={asset(img.src)}
            alt={img.alt}
            className="h-full w-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-soil/60 via-soil/15 to-soil/75" />

      <div className="absolute inset-0 flex flex-col">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pt-14 md:px-10 md:pt-[72px]">
          <span className="eyebrow text-paper/75">{hero.eyebrow}</span>
          <h1 className="mt-4 max-w-[16ch] whitespace-pre-line font-serif text-[8.6vw] font-black leading-[1.2] tracking-[0.04em] text-paper sm:text-[7vw] md:text-[4.4vw]">
            {hero.headline}
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-9">
            <Link
              href="/order"
              className="bg-brand px-9 py-4 text-[16px] font-medium tracking-[0.18em] text-white transition-colors hover:bg-lime hover:text-soil"
            >
              {hero.cta}
            </Link>
            <Link
              href="/about"
              className="border border-paper/50 px-8 py-4 text-[16px] tracking-[0.18em] text-paper transition-colors hover:border-lime hover:text-lime"
            >
              關於有種直送
            </Link>
          </div>
        </div>

        {/* selling points — large simple markers */}
        <div className="border-t border-paper/25 bg-soil/35 backdrop-blur-[2px]">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-10">
            {sellingPoints.map((p, i) => (
              <div
                key={p.n}
                className={`py-4 md:py-7 ${
                  i > 0 ? "md:border-l md:border-paper/20 md:pl-6" : ""
                } ${i % 2 === 1 ? "border-l border-paper/20 pl-4 md:pl-6" : ""}`}
              >
                <img
                  src={p.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 opacity-90 md:h-10 md:w-10"
                />
                <span className="roman mt-3 block text-[11px] font-semibold tracking-[0.3em] text-lime">
                  {p.n}
                </span>
                <span className="mt-1.5 block font-serif text-[16px] font-bold leading-snug tracking-[0.06em] text-paper md:mt-2 md:text-[21px]">
                  {p.label}
                </span>
                <span className="roman mt-1 block text-[9px] uppercase tracking-[0.26em] text-paper/55">
                  {p.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* crossfade position markers */}
      {list.length > 1 && (
        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          {list.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`切換背景圖片 ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-10 w-px transition-colors ${
                i === index ? "bg-lime" : "bg-paper/40 hover:bg-paper/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
