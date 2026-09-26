"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Admin has its own chrome.
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "border-b hairline bg-paper/92 backdrop-blur-md"
            : "border-b border-transparent bg-paper/88 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-5 md:h-[72px] md:px-10">
          <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name} 首頁`}>
            <span className="font-serif text-[19px] font-black leading-none tracking-[0.12em] text-ink md:text-[22px]">
              {site.name}
            </span>
            <span className="roman hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-olive sm:block">
              {site.nameEn}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative whitespace-nowrap py-2 text-[15px] tracking-[0.1em] text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
                <span className="roman ml-2 hidden text-[9px] uppercase tracking-[0.2em] text-olive/70 xl:inline">
                  {item.en}
                </span>
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brand transition-all duration-500 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/order"
              className="shrink-0 whitespace-nowrap bg-brand px-6 py-3 text-[15px] font-medium tracking-[0.14em] text-white transition-colors hover:bg-deep"
            >
              立即訂購
            </Link>
          </nav>

          <button
            type="button"
            aria-label="開啟選單"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-paper pt-16 md:hidden">
          <nav className="flex flex-col px-5">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline justify-between border-b hairline py-6"
                style={{ borderBottomWidth: 1 }}
              >
                <span className="font-serif text-[30px] font-bold tracking-[0.1em] text-ink">
                  {item.label}
                </span>
                <span className="roman text-[10px] uppercase tracking-[0.3em] text-olive">
                  0{i + 1} — {item.en}
                </span>
              </Link>
            ))}
          </nav>
          <div className="px-5 pt-8">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand px-6 py-4 text-center text-[16px] tracking-[0.16em] text-white"
            >
              WhatsApp 查詢菜包
            </a>
          </div>
        </div>
      )}
    </>
  );
}
