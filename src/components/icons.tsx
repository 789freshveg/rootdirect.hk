/** Hand-written brand marks — lucide no longer ships brand icons. */

type P = { size?: number; className?: string };

export function InstagramIcon({ size = 18, className = "" }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = "" }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2.5h-3a5 5 0 0 0-5 5v3H7v4h3v6.5h4V14.5h3l1-4h-4V7.5a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, className = "" }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 12a21 21 0 0 1 0-8 2.2 2.2 0 0 1 1.5-1.5 49 49 0 0 1 16 0A2.2 2.2 0 0 1 21.5 4a21 21 0 0 1 0 8 2.2 2.2 0 0 1-1.5 1.5 49 49 0 0 1-16 0A2.2 2.2 0 0 1 2.5 12" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 18, className = "" }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.4-4.6A8.4 8.4 0 1 1 20.5 11.7z" />
      <path d="M8.8 8.4c.3-.7.6-.7.9-.7h.6c.2 0 .5 0 .7.5l.8 1.9c.1.3 0 .5-.1.7l-.4.5c-.2.2-.3.4-.1.7a7 7 0 0 0 3.1 2.7c.3.1.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .8-.6 1.8-1.7 2-1 .2-2.6 0-5.2-2.2a10 10 0 0 1-2.7-3.6c-.4-1-.3-2 .1-2.6z" />
    </svg>
  );
}
