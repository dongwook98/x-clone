'use client';

import { User } from '@/app/model/User';
import { useQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';
import FollowRecommend from './FollowRecommend';

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale로 변하는 시간
    gcTime: 5 * 60 * 1000, // 기본값 5분
  });
  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
