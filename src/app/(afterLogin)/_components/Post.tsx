import styles from './Post.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from '@/app/(afterLogin)/_components/ActionButtons';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Post() {
  // 서버에서 받아온 데이터라고 가정
  const target = {
    User: {
      id: 'yrk7723',
      nickname: '김예리',
      image: '/yeri.jpeg',
    },
    content: '오늘 날씨가 참 좋네요.',
    createdAt: new Date(),
    Images: [],
  };

  return (
    <article className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${target.User.id}`} className={styles.postUserImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={styles.postShade} />
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={styles.postUserName}>
                {target.User.nickname}
              </span>
              &nbsp;
              <span className={styles.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={styles.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={styles.postImageSection}></div>
          <ActionButtons />
        </div>
      </div>
    </article>
  );
}
