import styles from './page.module.css';
import Post from '@/app/(afterLogin)/_components/Post';
import BackButton from '@/app/(afterLogin)/_components/BackButton';

export default function ProfilePage() {
  const user = {
    id: 'dongwook98',
    nickname: '강동욱',
    image: '/me.png',
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.image} alt={user.id} />
        </div>
        <div className={styles.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={styles.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
