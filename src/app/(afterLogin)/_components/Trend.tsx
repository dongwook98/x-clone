import Link from 'next/link';
import styles from './Trend.module.css';
import { HashTag } from '@/app/model/HashTag';

type Props = {
  trend: HashTag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link href={`/search?q=${trend.title}`} className={styles.container}>
      <div className={styles.count}>실시간트렌드</div>
      <div className={styles.title}>{trend.title}</div>
      <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
