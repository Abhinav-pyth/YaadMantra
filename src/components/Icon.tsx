import type { CategoryMeta } from "@/types/mnemonic";

export type IconName =
  | CategoryMeta["icon"]
  | "arrowRight"
  | "cards"
  | "check"
  | "chevronDown"
  | "close"
  | "copy"
  | "edit"
  | "external"
  | "heart"
  | "heartFilled"
  | "menu"
  | "moon"
  | "plus"
  | "search"
  | "share"
  | "sparkles"
  | "sun"
  | "timer"
  | "trash"
  | "trophy";

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function Icon({ name, className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8
};

const paths: Record<IconName, React.ReactNode> = {
  arrowRight: <path {...stroke} d="M5 12h14m-6-6 6 6-6 6" />,
  atom: (
    <>
      <circle cx="12" cy="12" fill="currentColor" r="1.5" />
      <path {...stroke} d="M20 12c0 2-3.6 3.6-8 3.6S4 14 4 12s3.6-3.6 8-3.6 8 1.6 8 3.6Z" />
      <path {...stroke} d="M16 19c-1.7 1-4.7-1.6-6.9-5.5S6.4 6 8.1 5 12.8 6.6 15 10.5 17.7 18 16 19Z" />
      <path {...stroke} d="M8 19c-1.7-1-.9-4.6 1.1-8.5S14.3 4 16 5s.9 4.6-1.1 8.5S9.7 20 8 19Z" />
    </>
  ),
  book: <path {...stroke} d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21V5.5Zm0 0A2.5 2.5 0 0 1 7.5 8H20" />,
  cards: (
    <>
      <rect {...stroke} height="13" rx="2.5" width="10" x="4" y="7" />
      <path {...stroke} d="M9 4h8a2.5 2.5 0 0 1 2.5 2.5v9" />
    </>
  ),
  check: <path {...stroke} d="m5 12.5 4 4L19 6" />,
  chevronDown: <path {...stroke} d="m6 9 6 6 6-6" />,
  close: <path {...stroke} d="M6 6l12 12M18 6 6 18" />,
  code: <path {...stroke} d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />,
  coffee: (
    <>
      <path {...stroke} d="M5 8h10v6.5A4.5 4.5 0 0 1 10.5 19h-1A4.5 4.5 0 0 1 5 14.5V8Z" />
      <path {...stroke} d="M15 10h1.5a2.5 2.5 0 0 1 0 5H15M7 4v1m3-1v1m3-1v1" />
    </>
  ),
  copy: (
    <>
      <rect {...stroke} height="11" rx="2" width="11" x="8" y="8" />
      <path {...stroke} d="M5 15V7a2 2 0 0 1 2-2h8" />
    </>
  ),
  edit: <path {...stroke} d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Zm11-12 3 3" />,
  external: <path {...stroke} d="M14 5h5v5m0-5-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />,
  heart: <path {...stroke} d="M20.2 5.8a5 5 0 0 0-7.1 0L12 6.9l-1.1-1.1a5 5 0 1 0-7.1 7.1L12 21l8.2-8.1a5 5 0 0 0 0-7.1Z" />,
  heartFilled: <path d="M20.2 5.8a5 5 0 0 0-7.1 0L12 6.9l-1.1-1.1a5 5 0 1 0-7.1 7.1L12 21l8.2-8.1a5 5 0 0 0 0-7.1Z" fill="currentColor" />,
  map: (
    <>
      <path {...stroke} d="m9 18-5 2V6l5-2 6 2 5-2v14l-5 2-6-2Z" />
      <path {...stroke} d="M9 4v14m6-12v14" />
    </>
  ),
  menu: <path {...stroke} d="M4 6h16M4 12h16M4 18h16" />,
  moon: <path {...stroke} d="M20 14.3A8 8 0 0 1 9.7 4a8.6 8.6 0 1 0 10.3 10.3Z" />,
  plus: <path {...stroke} d="M12 5v14M5 12h14" />,
  scroll: (
    <>
      <path {...stroke} d="M8 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1Zm0 0v13a3 3 0 0 1-3 3" />
      <path {...stroke} d="M11 8h5m-5 4h5m-5 4h3" />
    </>
  ),
  search: <path {...stroke} d="m20 20-4.5-4.5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />,
  share: <path {...stroke} d="M8.5 13.5 15.5 17M15.5 7 8.5 10.5M7 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm10 5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-10a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />,
  spark: <path {...stroke} d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14ZM5.5 14l.7 1.8L8 16.5l-1.8.7L5.5 19l-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />,
  sparkles: <path {...stroke} d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />,
  sun: (
    <>
      <circle {...stroke} cx="12" cy="12" r="4" />
      <path {...stroke} d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  target: (
    <>
      <circle {...stroke} cx="12" cy="12" r="8" />
      <circle {...stroke} cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" fill="currentColor" r="1.4" />
    </>
  ),
  timer: (
    <>
      <path {...stroke} d="M10 2h4m-2 7v4l3 2" />
      <circle {...stroke} cx="12" cy="13" r="8" />
    </>
  ),
  trash: <path {...stroke} d="M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7l1-3h4l1 3" />,
  trophy: (
    <>
      <path {...stroke} d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path {...stroke} d="M8 6H5a2 2 0 0 0 2 4h1m8-4h3a2 2 0 0 1-2 4h-1M12 12v4m-3 4h6m-5-4h4" />
    </>
  )
};
