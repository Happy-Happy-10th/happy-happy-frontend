import { CustomDrawer } from "@/components/base";
import { UserEventCreate } from "@/components/features";
import { Button } from "@/components/ui/button";

export default function TestAddEvent(){
  return(
    <CustomDrawer
      trigger={<Button variant="outline">Open Drawer</Button>}
      contents={ <UserEventCreate/>}
    />
  )
}