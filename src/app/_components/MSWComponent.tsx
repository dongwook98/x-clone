'use client';
import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    // 브라우저에서만 돌아간다는걸 보장
    if (typeof window !== 'undefined') {
      /**
       * 환경 변수명에 NEXT_PUBLIC이 붙으면 브라우저(클라이언트)에서 접근 가능한 환경 변수
       * 만약 NEXT_PUBLIC이 안붙으면 서버에서만 접근 가능, 브라우저에서 접근 가능하지 못함
       */
      // 개발때는 .env, .env.local 둘 다 실행
      // 배포때는 .env만 실행
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);

  return null;
};
