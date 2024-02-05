import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';
import Logo from '../../../public/logo.png';
import NavMenu from './_components/NavMenu';
import LogOutButton from './_components/LogOutButton';
import TrendSection from './_components/TrendSection';
import FollowRecommend from './_components/FollowRecommend';
import RightSearchZone from './_components/RightSearchZone';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

// () 폴더는 브라우저 주소에 추가되지 않음
// () 폴더는 레이아웃을 만들기 위해 사용함
// 레이아웃은 페이지 이동해도 그대로 유지됨, 새롭게 마운트 X
// 만약에 페이지 이동시 레이아웃도 새롭게 마운트 되게 하고 싶다면 template.tsx 사용
// layout.tsx와 template.tsx는 공존 X
export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href='/home'>
              <div className={styles.logoPill}>
                <Image src={Logo} alt='z.com로고' width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                {/* useSelectedLayoutSegment 사용하기 위해서 클라이언트 컴포넌트(NavMenu) 분리 */}
                <NavMenu />
              </ul>
              <Link href='/compose/tweet' className={styles.postButton}>
                게시하기
              </Link>
            </nav>
            {/* 이벤트리스너는 클라이언트 컴포넌트에서 사용해야하기 때문에 분리 */}
            <LogOutButton />
          </div>
        </section>
      </header>
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
    </div>
  );
}

// localhost:3000/home 접속 시
// RootLayout(모든 페이지에 적용됨) -> AfterLoginLayout((afterLogin)에 속해있는 페이지 모두 적용됨)
