'use client';

import styles from '../PhotoModal.module.css';
import ActionButtons from '@/app/(afterLogin)/_components/ActionButtons';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/app/model/Post';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[postId]/_lib/getSinglePost';

type Props = {
  postId: string;
};

export default function ImageZone({ postId }: Props) {
  const { data: post, error } = useQuery<
    PostType,
    Object,
    PostType,
    [_1: string, _2: string]
  >({
    queryKey: ['posts', postId],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className={styles.imageZone}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post?.Images[0].link} alt={post?.Images[0].Post?.content} />
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${post?.Images[0].link})` }}
      />
      <div className={styles.buttonZone}>
        <div className={styles.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}
