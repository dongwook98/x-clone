'use client';

import { HashTag } from '@/app/model/HashTag';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../../_lib/getTrends';
import Trend from '../../_components/Trend';

export default function TrendSection() {
  // 쿼리 재사용
  // home에서 getTrends 했기 때문에 explore 페이지 접속 시 캐시된 데이터 불러옴
  const { data } = useQuery<HashTag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale로 변하는 시간
    gcTime: 5 * 60 * 1000, // 기본값 5분
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
