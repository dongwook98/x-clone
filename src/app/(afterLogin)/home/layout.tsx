import { ReactNode } from 'react';

// localhost:3000/home 만의 레이아웃
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>홈 레이아웃</div>
      {children}
    </div>
  );
}

// localhost:3000/home 접속 시
// RootLayout(모든 페이지에 적용됨) -> HomeLayout(/home만 적용됨) -> HomePage
