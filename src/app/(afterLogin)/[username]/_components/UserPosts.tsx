'use client';

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_components/Post';
import { Post as PostType } from '@/app/model/Post';
import { getUserPosts } from '../_lib/getUserPosts';

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    PostType[],
    Object,
    PostType[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['users', username]);
  console.log('user', user);

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  return null;
}
