import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', () => {
    console.log('로그인 API 실행');
    return HttpResponse.json(
      { userId: 1, id: 'dongwook98', nickname: '강동욱', image: '/me.png' },
      {
        // 쿠키 넣는 방법
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        },
      }
    );
  }),

  http.post('/api/logout', () => {
    console.log('로그아웃 API 실행');
    return new HttpResponse(null, {
      // 로그아웃이니까 쿠키 없애기 -> 값을 없애버림 + Max-Age=0 추가
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),

  http.post('/api/users', () => {
    console.log('회원가입 API 실행');
    // 실패 응답
    return HttpResponse.text(JSON.stringify('user_exists'), {
      status: 403,
    });

    // 성공 응답
    // return HttpResponse.text(JSON.stringify('ok'), {
    //   headers: {
    //     'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;',
    //   },
    // });
  }),
];
