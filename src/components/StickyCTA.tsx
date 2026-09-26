"use client";

import { usePathname } from "next/navigation";
import { ShoppingBasket } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { site } from "@/content/site";

/** Mobile-only sticky pair: order + WhatsApp. */
export function StickyCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-soil/20 md:hidden">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-soil py-4 text-[15px] tracking-[0.12em] text-paper"
      >
        <WhatsappIcon size={17} />
        WhatsApp 查詢菜包
      </a>
      <a
        href="/order"
        className="flex items-center justify-center gap-2 bg-brand py-4 text-[15px] font-medium tracking-[0.12em] text-white"
      >
        <ShoppingBasket size={17} />
        立即訂購
      </a>
    </div>
  );
}
