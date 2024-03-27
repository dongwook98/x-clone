'use client';

import { useRouter } from 'next/navigation';
import Main from '../_components/Main';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  // redirect('/i/flow/login'); // 서버에서 리다이렉트 -> 인터셉팅 라우트 작동안됨
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace('/home');
    return null;
  }

  router.replace('/i/flow/login');
  return <Main />;
}
