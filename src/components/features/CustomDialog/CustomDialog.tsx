import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Box,
  Button,
  Text,
  Icon,
  AlertRedIcon,
} from '@/components/base';
import { cn } from '@/utils/tailwind-utils';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

type CustomDialogType = {
  open: boolean;
  onClose: () => void;
  icon: ReactNode;
  mainMsg?: string;
  subMsg?: string;
  btntext?: string;
  className?: string;
};
export default function CustomDialog({
  open,
  onClose,
  icon = <AlertRedIcon />,
  mainMsg,
  subMsg,
  btntext = '확인',
  className,
}: CustomDialogType) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className={cn(className, 'w-full')}>
        <DialogTitle hidden />
        <DialogHeader>
          <DialogClose asChild>
            <Box className="w-full flex justify-end">
              <button type="button" onClick={onClose}>
                <X size={24} />
              </button>
            </Box>
          </DialogClose>
        </DialogHeader>
        <Box className="w-full flex flex-col justify-center items-center mb-13">
          <Icon className="w-24 h-24 mb-8">{icon}</Icon>
          <Text className="mb-5" variant={'title4'}>
            {mainMsg}
          </Text>
          <Text variant={'body3'} className="text-yoteyo-gray-200">
            {subMsg}
          </Text>
        </Box>
        <Button type="button" variant={'default'} onClick={onClose}>
          <Text variant={'body3'}>{btntext}</Text>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
