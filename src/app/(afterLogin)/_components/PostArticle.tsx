'use client';

import styles from './PostArticle.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    // 이벤트 캡처링 -> onClickCapture
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}
