import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";

type PropsType = {
  trigger : ReactNode
  contents : ReactNode
}
export default function CustomSheet({trigger, contents}:PropsType){
  return(
    <Sheet>
      <SheetTrigger>
        {trigger}
        </SheetTrigger>
      <SheetContent>
        {contents}
      </SheetContent>
    </Sheet>
  )
}