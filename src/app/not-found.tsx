import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>이 페이지는 존재하지 않습니다.</h1>
      <Link href='/'>홈페이지</Link>
    </>
  );
}
