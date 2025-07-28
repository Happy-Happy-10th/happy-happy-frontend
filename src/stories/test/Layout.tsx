import clsx from "clsx";
import { ReactNode } from "react";
import { BottomTab } from "@/components/features";

const rootFrame = clsx(
  "w-full h-full flex flex-col",
  "bg-yoteyo-gray-100"
);

const contentsFrame = clsx(
  "flex-1 flex",          // 남은 공간 채우기
  "xl:p-[30px] xl:pb-[5px]",    // 여백 관리 (padding)
  "xl:pb-[calc(30px)]",
  "pl-[20px] pr-[20px]",
  "overflow-hidden"       // 자식이 넘칠 경우 안전하게 처리
);

const contentsBody = clsx(
  "flex-1 w-full",        // 가로·세로 자동 확장
  "rounded-[8px] bg-white" // 필요 시 스타일
);

const navigator = clsx(
  "w-full shrink-0"        // 높이 고정 (플로팅 버튼 영역)
);

type PropsType = { children: ReactNode };

export default function RootLayout({ children }: PropsType) {
  return (
    <div className={rootFrame}>
      <div className={contentsFrame}>
        <div className={contentsBody}>
          {children}
        </div>
      </div>
      <div className={navigator}>
        <BottomTab />
      </div>
    </div>
  );
}
