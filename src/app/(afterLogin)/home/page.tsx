import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Post from '../_components/Post';
import PostForm from './_components/PostForm';
import Tab from './_components/Tab';
import TabProvider from './_components/TabProvider';
import styles from './page.module.css';

async function getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`, {
    next: {
      tags: ['posts', 'recommends'], // 넥스트 서버에서 저장한 데이터를 업데이트 해주기 위한 Key, revalidateTag(), revalidatePath()로 가능
    },
    cache: 'no-store', // 넥스트 서버에서 캐시 설정
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function HomePage() {
  // react-query SSR
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
  });
  const dehydratedState = dehydrate(queryClient);
  console.log(dehydratedState);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
