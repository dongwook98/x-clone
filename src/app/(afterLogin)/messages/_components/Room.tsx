'use client';

import styles from '@/app/(afterLogin)/messages/_components/Room.module.css';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Room() {
  const router = useRouter();
  const user = {
    id: 'hero',
    nickname: '영웅',
    Messages: [
      { roomId: 123, content: '안녕하세요.', createdAt: new Date() },
      { roomId: 123, content: '안녕히가세요.', createdAt: new Date() },
    ],
  };

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };

  return (
    <div className={styles.room} onClickCapture={onClick}>
      <div className={styles.roomUserImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={faker.image.avatar()} alt='' />
      </div>
      <div className={styles.roomChatInfo}>
        <div className={styles.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={styles.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={styles.roomLastChat}>
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  );
}