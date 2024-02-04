'use client';

import style from './LogOutButton.module.css';

export default function LogOutButton() {
  // 임시로 내 정보 있는것처럼
  const me = {
    id: 'dongwook98',
    nickname: '강동욱',
    image: '/me.png',
  };

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
