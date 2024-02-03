import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      이 페이지는 존재하지 않습니다.
      <Link href={'/'}>홈</Link>
    </>
  );
}
