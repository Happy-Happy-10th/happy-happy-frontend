import { cn } from "@/utils/tailwind-utils";
import { Textarea } from "../ui/textarea";

interface PropsType extends React.ComponentProps<"textarea">{
  placeholder:string;
  rows?:number;
  className ?: string;
}
export default function CustomTextArea({
  placeholder,
  rows=1, 
  className,
  ...props
}:PropsType){
  return (
    <Textarea 
      rows={rows}
      placeholder={placeholder}
      className={cn(className,"resize-none")}
      {...props}
      />
  )
}