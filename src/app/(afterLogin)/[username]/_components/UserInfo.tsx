'use client';

import styles from '../page.module.css';
import { useQuery } from '@tanstack/react-query';
import BackButton from '../../_components/BackButton';
import { User } from '@/app/model/User';
import { getUser } from '../_lib/getUser';

type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // 존재하지 않는 사용자 404
  if (error) {
    return (
      <>
        <div className={styles.header}>
          <BackButton />
          <h3 className={styles.headerTitle}>프로필</h3>
        </div>
        <div className={styles.userZone}>
          <div className={styles.userImage}></div>
          <div className={styles.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: 'center',
            fontSize: 31,
            fontWeight: 'bold',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>{user?.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user?.image} alt={user?.id} />
        </div>
        <div className={styles.userName}>
          <div>{user?.nickname}</div>
          <div>@{user?.id}</div>
        </div>
        <button className={styles.followButton}>팔로우</button>
      </div>
    </>
  );
}
