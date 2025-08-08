import type { Metadata } from 'next';
import '@/styles/global.css';
import { QueryProvider } from '@/provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: '당신만의 AI 캘린더 비서 요때요',
  description: '일정 예측부터 자동 등록까지 한번에!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>

      <body>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
          {/* <Navigator/> */}
        </QueryProvider>
      </body>
    </html>
  );
}
