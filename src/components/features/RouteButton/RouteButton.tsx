'use client';

import { Button } from '@/components/base';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
  routePath: string;
  variant?: 'default' | 'outline';
  className?: string;
};
/**
 * SSR 컴포넌트에서 라우팅을 하기 위한 버튼 컴포넌트 base의 Button을 커스텀하였음.
 * @children 버튼의 요소
 * @variant  버튼 디자인 유형 base의 Button과 동일하게 설정
 * @routePath 이동할 페이지 경로
 */
export default function RouteButton({ children, variant = 'default', className, routePath }: PropsType) {
  const router = useRouter();
  const handleRoute = () => {
    router.push(routePath);
  };
  return (
    <Button className={className} type="button" variant={variant} onClick={handleRoute}>
      {children}
    </Button>
  );
}
