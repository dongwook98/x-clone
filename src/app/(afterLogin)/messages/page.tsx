import styles from './page.module.css';
import Room from '@/app/(afterLogin)/messages/_components/Room';

export default function MessagesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
