import styles from './Post.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import ActionButtons from '@/app/(afterLogin)/_components/ActionButtons';
import PostArticle from './PostArticle';
import { faker } from '@faker-js/faker';
import PostImages from './PostImages';
dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
};

/**
 *
 * @param noImage 포토 모달 진입 시 이미지 안보이게 처리하는 prop
 * @returns
 */
export default function Post({ noImage }: Props) {
  // 서버에서 받아온 데이터라고 가정
  const target = {
    postId: 1,
    User: {
      id: 'dongwook98',
      nickname: '강동욱',
      image: '/me.png',
    },
    content: '오늘 날씨가 참 좋네요.',
    createdAt: new Date(),
    Images: [] as any[],
  };

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() }
    );
  }

  return (
    // 클라이언트 컴포넌트(PostArticle)에 서버 컴포넌트(children)를 넣어도 됨
    // 클라이언트 컴포넌트에서 임포트만 하지않으면 됨 -> 서버 컴포넌트가 클라이언트 컴포넌트로 변환됨
    // 서버 컴포넌트는 클라이언트 컴포넌트의 자식일때 항상 children이나 props로 보낸다.
    <PostArticle post={target}>
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
          <div>
            <PostImages post={target} />
          </div>
          {/* 클라이언트 컴포넌트 분리 */}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
