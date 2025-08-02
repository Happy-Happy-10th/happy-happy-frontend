"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { IconKey, iconMap, setActionLinkValue } from "@/utils";

type ActiveLinkProps ={navKey : string}
export function ActiveLink({navKey}: ActiveLinkProps) {
  const segment = useSelectedLayoutSegment();
  const {title,href,activeIcon,noneActiveIcon} = setActionLinkValue(navKey);
  const isActive = navKey===segment;
  const Icon = isActive
    ? iconMap[activeIcon as IconKey] 
    : iconMap[noneActiveIcon as IconKey];

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon className="w-5 h-5" />
      <span className={clsx("mt-1", isActive && "text-yoteyo-main")}>
        {title}
      </span>
    </Link>
  );
}
