"use client"

import { HouseIcon, ArrowsDownUpIcon, ChartDonutIcon, TipJarIcon, ReceiptIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = {
  home: HouseIcon,
  arrowUpDown: ArrowsDownUpIcon,
  pieChart: ChartDonutIcon,
  wallet: TipJarIcon,
  receipt: ReceiptIcon,
};

export default function SidebarItem({ item, collapsed }) {
  // Icon is a react component reference, so we use PacalCase
  const Icon = icons[item.icon];

  const pathname = usePathname();
  const isActive = pathname == item.href;

  return (
    <Link href={item.href} aria-label={item.label} aria-current={isActive ? "page" : undefined}>
      <div className={`sidebar-item md:px-8 md:py-4 pt-2 pb-3 sm:px-4 px-5 items-center md:rounded-r-xl md:rounded-t-none rounded-t-xl ${isActive? "bg-white md:border-l-4 md:border-b-0 border-l-0 border-b-6 border-green text-grey-900":"" }`}>
        <Icon weight="fill" className={`size-6 shrink-0 ${isActive? "text-green": ""} `} />
        <span className={`sm:block hidden
    transition-all duration-200 whitespace-nowrap
    ${collapsed
            ? "md:opacity-0 md:w-0 overflow-hidden"
            : "opacity-100 w-auto"}
  `}>{item.label}</span>
      </div>
    </Link>
  );
}
