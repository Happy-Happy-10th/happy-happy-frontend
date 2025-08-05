'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import clsx from "clsx";

import {Text} from '@/components/base'
import { IconKey, iconMap, setActionLinkValue } from "@/utils";

type ActiveLinkProps ={navKey : string}
export function ActiveLink({navKey}: ActiveLinkProps) {
  const pathname = usePathname() ?? "";
  const {title,href,activeIcon,noneActiveIcon} = setActionLinkValue(navKey);
  const isActive = pathname.startsWith(href);

  const Icon = isActive
    ? iconMap[activeIcon as IconKey] 
    : iconMap[noneActiveIcon as IconKey];

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon className="w-5 h-5" />
      <span className={clsx("mt-1", isActive && "text-yoteyo-main")}>
        <Text variant={"body4"}>{title}</Text>
      </span>
    </Link>
  );
}
