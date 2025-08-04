import { CustomDrawer, CustomSheet } from "@/components/base";

import { UserEventForm } from "@/components/features";
import { Button } from "@/components/ui/button";

export default function TestAddEvent(){
  return(
    <div>
      <CustomDrawer
      trigger={<Button variant="outline">Open Drawer</Button>}
      contents={ <UserEventForm/>}
      />
      <CustomSheet
      trigger={<Button variant="outline">Open sheet</Button>}
      contents={ <UserEventForm/>}
      />
    </div>
  )
}