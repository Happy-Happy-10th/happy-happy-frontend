"use client"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  ReactNode,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { DrawerType } from "@/@types";
import { Button } from "@/components/ui/button";

export type CustomDrawerHandle = {
  open: () => void;
  close: () => void;
};

type PropsType = {
  trigger: ReactNode;
  contents: ReactNode;
  type?: DrawerType;
};

// forwardRef 적용
const CustomDrawer = forwardRef<CustomDrawerHandle, PropsType>(
  ({ trigger, contents, type = "view" }, ref) => {
    const isDesktop = false;

    const [isOpen, setIsOpen] = useState(false);

    // 외부에서 열고 닫을 수 있게 메서드 노출
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <>
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
        <Drawer
          direction={isDesktop ? "right" : "bottom"}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DrawerContent className="h-200 bg-yoteyo-bg-modal p-0">
            <div className="mx-auto w-full max-w-sm h-full flex flex-col">
              <DrawerHeader className="p-0">
                <DrawerTitle className="sr-only">이벤트 추가/수정</DrawerTitle>

                {type === "view" && (
                  <div className="flex flex-row justify-end">
                    <DrawerClose asChild>
                      <Button variant="ghost">
                        <span className="text-[18px]">닫기</span>
                      </Button>
                    </DrawerClose>
                  </div>
                )}

                {type === "create" && (
                  <div className="flex flex-row justify-between">
                    <DrawerClose asChild>
                      <Button variant="ghost">
                        <span className="text-[18px]">취소</span>
                      </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button variant="ghost">
                        <span className="text-yoteyo-main text-[18px]">저장</span>
                      </Button>
                    </DrawerClose>
                  </div>
                )}

                {type === "edit" && (
                  <div className="flex flex-row justify-between">
                    <DrawerClose asChild>
                      <Button variant="ghost">
                        <span className="text-[18px]">취소</span>
                      </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button variant="ghost">
                        <span className="text-yoteyo-main text-[18px]">수정</span>
                      </Button>
                    </DrawerClose>
                  </div>
                )}
              </DrawerHeader>

              {contents}
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
);

// 디버깅 편의용 displayName 설정
CustomDrawer.displayName = "CustomDrawer";

export { CustomDrawer };
