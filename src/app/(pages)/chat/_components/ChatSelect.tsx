import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { SIDO } from '@/@mock';

function ChatSelect({ ...props }: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger className="bg-white data-[state=open]:border-yoteyo-main ring-0 focus-visible:ring-0 focus-visible:border-none aria-invalid:border-none">
        <SelectValue placeholder="시도" />
      </SelectTrigger>

      <SelectContent className="border-none">
        {SIDO.map(item => {
          return (
            <SelectItem key={item} value={item} className="focus:bg-white focus:text-yoteyo-main cursor-pointer">
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export { ChatSelect };
