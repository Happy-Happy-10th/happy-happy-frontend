import ServiceLayout from "@/components/layouts/ServiceLayout";
import { ReactNode } from "react";

type layoutType = {children:ReactNode}
export default function layout({children}:layoutType){
  return(
    <ServiceLayout>
      {children}
    </ServiceLayout>
  )
}