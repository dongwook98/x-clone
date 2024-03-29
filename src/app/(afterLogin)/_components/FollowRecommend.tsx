'use client';

import styles from './FollowRecommend.module.css';

export default function FollowRecommend() {
  const onFollow = () => {};

  const user = {
    id: 'yrk7723',
    nickname: '김예리',
    image: '/yeri.jpeg',
  };

  return (
    <div className={styles.container}>
      <div className={styles.userLogoSection}>
        <div className={styles.userLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>{user.nickname}</div>
        <div className={styles.count}>@{user.id}</div>
      </div>
      <div className={styles.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
