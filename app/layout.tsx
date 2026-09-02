import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
export const metadata: Metadata = { title: 'Artpick — 발견이 아이디어가 되는 순간', description: '디자인 AI 콘텐츠를 발견하고 저장하고, 아이디어를 프로젝트로 공개하세요.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} antialiased`}>{children}</body></html>;
}
