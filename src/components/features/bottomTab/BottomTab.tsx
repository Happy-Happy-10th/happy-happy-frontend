import clsx from "clsx";
import { ActiveLink } from "./ui/ActiveLink";
import { Icon, HomeActiveIcon, HomeInActiveIcon, FeedActiveIcon, FeedInActiveIcon } from "@/components/base";

const navigatorFrame = clsx(
  "relative w-full h-[60px]",
  "bg-white flex justify-center items-center overflow-visible",
  "shadow-[0_-4px_8px_rgba(0,0,0,0.08)]",
  "pl-[20px] pr-[20px]"
);

const navigatorMain = clsx(
  "max-w-[600px] flex flex-row justify-between items-center flex-1 px-12 relative z-10" 
);

const navItem = clsx(
  "flex flex-col items-center text-gray-400 text-sm"
);

// 버튼 래퍼
const centerButtonWrapper = clsx(
  "absolute -top-[34px] left-1/2 -translate-x-1/2 z-10", // 정확히 28px 위로 이동
  "w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center"
);

const centerButton = clsx(
  "w-[56px] h-[56px] rounded-full bg-gradient-to-br from-purple-500 to-blue-400",
  "flex items-center justify-center text-white font-bold",
  "shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform hover:scale-110"
);

export default function BottomTab() {
  return (
    <div className={navigatorFrame}>
      <div className={navigatorMain}>
        <div className={navItem}>
          <ActiveLink 
            navKey="home"
            activeSvg={<HomeActiveIcon/>}
            inActiveSvg={<HomeInActiveIcon/>}
            />
        </div>
        <div className={centerButtonWrapper}>
          <div className={centerButton}>AI</div>
        </div>
        <div className={navItem}>
          <ActiveLink 
            navKey="feed"
            activeSvg={<FeedActiveIcon/>}
            inActiveSvg={<FeedInActiveIcon/>}
            />
        </div>
      </div>
    </div>
  );
}
