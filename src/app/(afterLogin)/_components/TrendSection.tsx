'use client';

import { HashTag } from '@/app/model/HashTag';
import styles from './TrendSection.module.css';
import Trend from '@/app/(afterLogin)/_components/Trend';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { getTrends } from '../_lib/getTrends';

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale로 변하는 시간
    gcTime: 5 * 60 * 1000, // 기본값 5분
    enabled: !!session?.user, // 로그인했을때만 요청 (조건부 쿼리)
  });

  const pathname = usePathname();
  if (pathname === '/explore') return null;

  if (!session?.user)
    return (
      <div className={styles.trendBg}>
        <div className={styles.noTrend}>트렌드를 가져올 수 없습니다.</div>
      </div>
    );

  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        {data?.map((trend) => (
          <Trend trend={trend} key={trend.tagId} />
        ))}
      </div>
    </div>
  );
}
