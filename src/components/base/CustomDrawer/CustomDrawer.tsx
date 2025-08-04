import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTrigger } from "@/components/ui/drawer";
  import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type PropsType = {
  trigger : ReactNode
  contents : ReactNode
}
export default function CustomDrawer({trigger,contents}:PropsType){
  return(
    <Drawer>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-200 bg-yoteyo-bg-modal p-0">
        <div className="mx-auto w-full max-w-sm h-full flex flex-col">
          {/* Drawer 해더 */}
          <DrawerHeader className="p-0">
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