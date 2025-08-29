import type { Metadata } from 'next';
import '@/styles/global.css';
import { QueryProvider } from '@/provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <NuqsAdapter>{children}</NuqsAdapter>
          {/* <Navigator/> */}
        </QueryProvider>
      </body>
    </html>
  );
}
