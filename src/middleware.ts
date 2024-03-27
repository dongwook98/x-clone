import { auth } from './auth';
import { NextResponse } from 'next/server';

export async function middleware() {
  const session = await auth(); // auth 함수: 서버에서 로그인 여부 판단 가능
  if (!session) {
    // 세션이 없다면 로그인 페이지로 리다이렉트
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}

// 미들웨어는 Next에서 제공함
// auth 미들웨어 적용할 라우트 설정
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
