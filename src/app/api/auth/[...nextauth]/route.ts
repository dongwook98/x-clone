// catch-all 라우트 [...nextauth] : /api/auth/a/b/c/d/e/... 가능
// 프론트 서버도 서버기 때문에 라우트 기능이 가능한 것
export { GET, POST } from '@/auth'; // '@/auth.ts'에서 정의한 GET, POST 이 파일에서 export해줘야지 동작함
