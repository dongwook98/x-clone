import HomePage from '@/app/(afterLogin)/home/page';

type Props = {
  params: { username: string; postId: string; photoId: string };
};
export default function Page({ params }: Props) {
  console.log(params.username); // dongwook98
  console.log(params.postId);
  console.log(params.photoId);

  return <HomePage />;
}
