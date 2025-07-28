import { Home, HomeIcon, List, ListIcon } from "lucide-react";

const navItems = [
  {
    key : "home",
    title : "홈",
    href : "/home",
    activeIcon : "homeActive",
    noneActiveIcon : "homeNoneActive"
  },
  {
    key : "feed",
    title : "피드",
    href : "/feed",
    activeIcon :"feedActive" ,
    noneActiveIcon : "feedNoneActive"
  },
]

export const iconMap = {
  homeActive: Home,
  homeNoneActive : HomeIcon,
  feedActive : List,
  feedNoneActive: ListIcon
} as const;

export type IconKey = keyof typeof iconMap;

export const setActionLinkValue = (key:string)=>{
  const values = navItems.find((nav)=>nav.key===key);
  if (!values) throw new Error(`Invalid nav key: ${key}`);
  return values;
}