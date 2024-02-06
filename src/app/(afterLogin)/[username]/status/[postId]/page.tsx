import BackButton from '@/app/(afterLogin)/_components/BackButton';
import styles from './page.module.css';
import Post from '@/app/(afterLogin)/_components/Post';
import CommentForm from './_components/CommentForm';

export default function DetailPostPage() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>게시하기</h3>
      </div>
      <Post />
      <CommentForm />
      <div>
        {/* 댓글들 */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
