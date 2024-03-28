'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_components/Post';
import { Post as PostType } from '@/app/model/Post';

export default function PostRecommends() {
  // 클라이언트 react-query
  const { data } = useQuery<PostType[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale로 변하는 시간
    gcTime: 5 * 60 * 1000, // 기본값 5분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
