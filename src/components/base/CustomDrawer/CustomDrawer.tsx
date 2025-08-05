import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger } from "@/components/ui/drawer";
  import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type PropsType = {
  trigger : ReactNode
  contents : ReactNode
}
export default function CustomDrawer({trigger,contents}:PropsType){
  // Drawer은 뷰포트 기준으로 나와서 아무래도 motion으로 직접만들어야할듯
  const isDesktop=false
  return(
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-200 bg-yoteyo-bg-modal p-0">
        <div className="mx-auto w-full max-w-sm h-full flex flex-col">
          {/* Drawer 해더 */}
          <DrawerHeader className="p-0">
            <DrawerTitle className="sr-only">이밴트 추가/수정</DrawerTitle>
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
          </DrawerHeader>
          {contents}
        </div>
      </DrawerContent>
    </Drawer>
  )
}