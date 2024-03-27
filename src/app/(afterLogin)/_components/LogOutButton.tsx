'use client';

import style from './LogOutButton.module.css';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function LogOutButton() {
  const router = useRouter();
  const { data: me } = useSession();
  console.log(me?.user);

  const onLogout = () => {
    signOut({
      redirect: false, // 서버 리다이렉트 꺼주기
    }) //
      .then(() => {
        router.replace('/'); // 클라이언트에서 리다이렉트
      });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.user?.image as string} alt={me.user?.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
