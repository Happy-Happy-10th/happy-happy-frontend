import { AddEvent } from "@/components/features";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import clsx from "clsx";

const itemsStyle = clsx(
  "w-full bg-white rounded-[8px]"
)

export default function TestAddEvent(){
  return(
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
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
          <AddEvent/>
        </div>
      </DrawerContent>
    </Drawer>
  )
}