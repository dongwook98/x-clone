import styles from './HomePage.module.css';
import Image from 'next/image';
import Logo from '../../public/logo.png'; // 임포트 가능
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Image -> Next.js가 알아서 이미지 최적화해줌 */}
      <div className={styles.leftSection}>
        <Image src={Logo} alt='logo' priority />
      </div>
      <div className={styles.rightSection}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        {/* Link -> Next.js에서는 a태그 대신 Link 사용해야지 새로고침 안됨 */}
        <Link href='/i/flow/signup' className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href='login' className={styles.login}>
          로그인
        </Link>
      </div>
    </div>
  );
}
