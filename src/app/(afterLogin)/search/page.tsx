import styles from './page.module.css';
import BackButton from '@/app/(afterLogin)/_components/BackButton';
import SearchForm from '@/app/(afterLogin)/_components/SearchForm';
import Tab from '@/app/(afterLogin)/search/_components/Tab';
import SearchResult from './_components/SearchResult';

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

// SSR 안해도되서 SearchResult에서 데이터 페칭
// searchParams가 기본적으로 들어있음
export default function SearchPage({ searchParams }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.searchTop}>
        <div className={styles.searchZone}>
          <div className={styles.buttonZone}>
            <BackButton />
          </div>
          <div className={styles.formZone}>
            <SearchForm />
          </div>
        </div>
        <Tab />
      </div>
      <div className={styles.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
