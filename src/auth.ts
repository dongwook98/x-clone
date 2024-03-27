import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST }, //
  auth,
  signIn, // signIn 함수: 로그인 하는 함수
} = NextAuth({
  // 커스텀 페이지 등록
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },

  // providers: 로그인 방식들 등록
  providers: [
    // CredentialsProvider: 기본 로그인 프로바이더
    CredentialsProvider({
      // authorize: 로그인 시 실행, credentials에는 로그인 폼에 입력 값 들어있음
      async authorize(credentials) {
        // 로그인 API 요청
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Auth.js에서 username, password로 고정해놔서 변경해줌
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );

        // 로그인 API 응답 실패 처리
        if (!authResponse.ok) {
          return null;
        }

        // 로그인 API 성공 실패 처리
        const user = await authResponse.json();
        console.log('user', user);
        // 여기서의 리턴값이 auth 함수로 로그인 정보 가져올때 가져오는 값임
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
