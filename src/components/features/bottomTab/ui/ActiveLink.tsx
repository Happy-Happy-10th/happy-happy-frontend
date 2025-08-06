'use client';

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; 
import { IconKey, iconMap, setActionLinkValue } from "@/utils";
import { Icon } from '@/components/base/Icon';

type ActiveLinkProps ={
  navKey : string
  activeSvg : ReactNode
  inActiveSvg : ReactNode
}
export function ActiveLink({navKey, activeSvg, inActiveSvg}: ActiveLinkProps) {
  const pathname = usePathname() ?? "";
  const {title,href,activeIcon,noneActiveIcon} = setActionLinkValue(navKey);
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon>
        {isActive?activeSvg:inActiveSvg}
      </Icon>
    </Link>
  );
}

