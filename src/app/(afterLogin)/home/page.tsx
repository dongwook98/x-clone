import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import PostForm from './_components/PostForm';
import Tab from './_components/Tab';
import TabProvider from './_components/TabProvider';
import styles from './page.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_components/PostRecommends';

export default async function HomePage() {
  // react-query SSR
  const queryClient = new QueryClient(); // 리액트 쿼리 동작을 수행하는 클라이언트라는 의미
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
