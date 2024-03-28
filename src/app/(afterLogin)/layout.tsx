import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';
import Logo from '../../../public/logo.png';
import NavMenu from './_components/NavMenu';
import LogOutButton from './_components/LogOutButton';
import TrendSection from './_components/TrendSection';
import FollowRecommend from './_components/FollowRecommend';
import RightSearchZone from './_components/RightSearchZone';
import { auth } from '@/auth';
import RQProvider from './_components/RQProvider';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

// () 폴더는 브라우저 주소에 추가되지 않음
// () 폴더는 레이아웃을 만들기 위해 사용함
// 레이아웃은 페이지 이동해도 그대로 유지됨, 새롭게 마운트 X
// 만약에 페이지 이동시 레이아웃도 새롭게 마운트 되게 하고 싶다면 template.tsx 사용
// layout.tsx와 template.tsx는 공존 X
export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href={session?.user ? '/home' : '/'}>
              <div className={styles.logoPill}>
                <Image src={Logo} alt='z.com로고' width={40} height={40} />
              </div>
            </Link>
            {session?.user && (
              <>
                <nav>
                  <ul>
                    {/* useSelectedLayoutSegment 사용하기 위해서 클라이언트 컴포넌트(NavMenu) 분리 */}
                    <NavMenu />
                  </ul>
                  <Link href='/compose/tweet' className={styles.postButton}>
                    <span>게시하기</span>
                    <svg
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      className='r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp'
                    >
                      <g>
                        <path d='M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z'></path>
                      </g>
                    </svg>
                  </Link>
                </nav>
                {/* 이벤트리스너는 클라이언트 컴포넌트에서 사용해야하기 때문에 분리 */}
                <LogOutButton />
              </>
            )}
          </div>
        </section>
      </header>
      <RQProvider>
        <div className={styles.rightSectionWrapper}>
          <div className={styles.rightSectionInner}>
            <main className={styles.main}>{children}</main>
            <section className={styles.rightSection}>
              <RightSearchZone />
              <TrendSection />
              <div className={styles.followRecommend}>
                <h3>팔로우 추천</h3>
                <FollowRecommend />
                <FollowRecommend />
                <FollowRecommend />
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  );
}

// localhost:3000/home 접속 시
// RootLayout(모든 페이지에 적용됨) -> AfterLoginLayout((afterLogin)에 속해있는 페이지 모두 적용됨)
