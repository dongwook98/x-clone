import BackButton from '@/app/(afterLogin)/_components/BackButton';
import styles from './page.module.css';
import CommentForm from './_components/CommentForm';
import SinglePost from './_components/SinglePost';
import Comments from './_components/Comments';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getSinglePost } from './_lib/getSinglePost';
import { getComments } from './_lib/getComments';

type Props = {
  params: { postId: string };
};

export default async function DetailPostPage({ params }: Props) {
  const { postId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', postId],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={styles.header}>
          <BackButton />
          <h3 className={styles.headerTitle}>게시하기</h3>
        </div>
        <SinglePost postId={postId} />
        <CommentForm postId={postId} />
        <div>
          <Comments postId={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
