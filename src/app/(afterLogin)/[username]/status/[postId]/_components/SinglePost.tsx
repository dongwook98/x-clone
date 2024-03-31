'use client';

import { useQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_components/Post';
import { Post as PostType } from '@/app/model/Post';
import { getSinglePost } from '../_lib/getSinglePost';

type Props = {
  postId: string;
  noImage?: boolean;
};

export default function SinglePost({ postId, noImage }: Props) {
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

  if (error) {
    return (
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
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return <Post key={post.postId} post={post} noImage={noImage} />;
}
