import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MSWComponent } from './_components/MSWComponent';
import AuthSession from './_components/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// 루트 레이아웃이 모든 페이지의 레이아웃이 됨
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>
          {/* page가 children에 들어감 */}
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
