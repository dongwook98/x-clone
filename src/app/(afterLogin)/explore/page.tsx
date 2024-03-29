import styles from './page.module.css';
import SearchForm from '../_components/SearchForm';
import TrendSection from './_components/TrendSection';

export default function ExplorePage() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
