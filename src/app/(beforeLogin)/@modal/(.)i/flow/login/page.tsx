import LoginModal from '../../../../_components/LoginModal';

// 패러렐 라우트 -> 한개의 화면에 여러개의 페이지를 동시에 보여줄 수 있음
// 패러렐 라우트 사용 조건
// 1) 동시에 보여주고 싶은 페이지들이 같은 폴더(beforeLogin)에 있어야함
// 2) layout.tsx도 같은 폴더(beforeLogin)에 있어야함
export default function LoginPage() {
  return <LoginModal />;
}
