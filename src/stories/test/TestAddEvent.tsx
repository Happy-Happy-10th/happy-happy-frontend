import { CustomDrawer } from "@/components/base";
import { UserEventForm } from "@/components/features";
import { Button } from "@/components/ui/button";

export default function TestAddEvent(){
  return(
    <CustomDrawer
      trigger={<Button variant="outline">Open Drawer</Button>}
      contents={ <UserEventForm/>}
    />
  )
}