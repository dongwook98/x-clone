'use client';

import { Post as PostType } from '@/app/model/Post';
import { useQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_components/Post';
import { getSearchResult } from '../_lib/getSearchResult';

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    PostType[],
    Object,
    PostType[],
    [_1: string, _2: string, Props['searchParams']]
  >({
    queryKey: ['posts', 'search', searchParams], // react-query 캐시 키에는 객체 가능
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
