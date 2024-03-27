import { redirect } from 'next/navigation';
import Main from './_components/Main';
import { auth } from '@/auth';

export default async function BeforeLoginHomePage() {
  const session = await auth();
  if (session?.user) {
    redirect('/home');
  }

  return <Main />;
}
