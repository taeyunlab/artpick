import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ARTPICK — 당신의 취향이 작품을 만나는 곳',
  description: '새로운 작가와 작품을 발견하고, 소장하는 즐거움을 시작하세요. 예술 큐레이션 & 작품 컬렉션 플랫폼 ARTPICK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Noto+Serif+KR:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#f7f6f2] text-[#181816] selection:bg-[#1a56db] selection:text-white">
        {children}
      </body>
    </html>
  );
}

