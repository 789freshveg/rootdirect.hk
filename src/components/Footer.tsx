import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/icons";
import { footerNav, site } from "@/content/site";

const socials = [
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.whatsappHref, label: "WhatsApp", Icon: WhatsappIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-9 md:px-10 md:pb-9 md:pt-11">
        {/* row 1 — wordmark · contact */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <Link href="/" className="group inline-block shrink-0">
            <span className="block font-serif text-[32px] font-black leading-none tracking-[0.1em] text-paper transition-colors group-hover:text-lime md:text-[36px]">
              {site.name}
            </span>
            <span className="roman mt-2 block text-[10px] uppercase tracking-[0.4em] text-paper/60">
              {site.nameEn}
            </span>
          </Link>

          <div className="shrink-0 sm:text-right">
            <p className="eyebrow text-paper/60">聯絡 / Contact</p>
            <div className="mt-3 flex gap-3 sm:justify-end">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-12 w-12 items-center justify-center border border-paper/35 transition hover:border-lime hover:text-lime sm:h-14 sm:w-14"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* row 2 — index */}
        <nav aria-label="導覽" className="mt-7 border-t border-paper/25 pt-4">
          <p className="eyebrow text-paper/60">導覽 / Index</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-[16px] tracking-[0.06em] text-paper/85 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {item.label}
                  <span className="roman ml-2 hidden text-[9px] uppercase tracking-[0.18em] text-paper/55 lg:inline">
                    {item.en}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
          <p className="roman text-[10px] uppercase tracking-[0.22em] text-paper/60">
            © {year} {site.name} {site.nameEn}. All rights reserved.
          </p>
          <p className="text-[14px] text-paper/60">
            農場直送　·　睇得到的信任
          </p>
        </div>
      </div>
    </footer>
  );
}
