import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/tailwind-utils";


interface PropsType extends React.ComponentProps<"textarea">{
  placeholder:string;
  rows?:number;
  className ?: string;
}
export default function TextArea({
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