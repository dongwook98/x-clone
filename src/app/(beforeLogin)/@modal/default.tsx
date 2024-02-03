// layout.tsx에서 modal을 못찾으면 not-found 페이지로 이동시켜줌
// 위 문제 해결하기 위해서 패러렐 라우트에 default.tsx 생성
// default.tsx는 패러렐 라우트(동시에 보여줄 필요)가 필요없을때 생성

export default function Default() {
  return null;
}
