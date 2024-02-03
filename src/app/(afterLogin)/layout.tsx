type Props = {
  children: React.ReactNode;
};

// () 폴더는 브라우저 주소에 추가되지 않음
// () 폴더는 레이아웃을 만들기 위해 사용함
// 레이아웃은 페이지 이동해도 그대로 유지됨, 새롭게 마운트 X
// 만약에 페이지 이동시 레이아웃도 새롭게 마운트 되게 하고 싶다면 template.tsx 사용
// layout.tsx와 template.tsx는 공존 X
export default function AfterLoginLayout({ children }: Props) {
  return <>애프터 로그인 레이아웃{children}</>;
}

// localhost:3000/home 접속 시
// RootLayout(모든 페이지에 적용됨) -> AfterLoginLayout((afterLogin)에 속해있는 페이지 모두 적용됨)
