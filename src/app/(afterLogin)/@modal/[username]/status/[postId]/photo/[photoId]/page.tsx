import CommentForm from '@/app/(afterLogin)/[username]/status/[postId]/_components/CommentForm';
import styles from './PhotoModal.module.css';
import PhotoModalCloseButton from '@/app/(afterLogin)/@modal/[username]/status/[postId]/photo/[photoId]/_components/PhotoModalCloseButton';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[postId]/_lib/getSinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[postId]/_lib/getComments';
import SinglePost from '@/app/(afterLogin)/[username]/status/[postId]/_components/SinglePost';
import Comments from '@/app/(afterLogin)/[username]/status/[postId]/_components/Comments';
import ImageZone from './_components/ImageZone';

type Props = {
  params: { postId: string };
};

export default async function PhotoModal({ params }: Props) {
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
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone postId={postId} />
        <div className={styles.commentZone}>
          <SinglePost postId={postId} noImage />
          <CommentForm postId={postId} />
          <Comments postId={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
