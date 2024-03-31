'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_components/Post';
import { Post as PostType } from '@/app/model/Post';
import { getComments } from '../_lib/getComments';

type Props = {
  postId: string;
};

export default function Comments({ postId }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(['posts', postId]);

  const { data } = useQuery<
    PostType[],
    Object,
    PostType[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['posts', postId, 'comments'],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!post, // 게시글 없을때
  });

  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />);
  }

  return null;
}
