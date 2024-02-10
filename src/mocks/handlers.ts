import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

const User = [
  { id: 'yrk7723', nickname: '김예리', image: '/yeri.jpeg' },
  { id: 'dongwook98', nickname: '강동욱', image: '/me.png' },
  { id: 'tain1234', nickname: '이태인', image: faker.image.avatar() },
];

const Posts = [];

export const handlers = [
  http.post('/api/login', () => {
    console.log('로그인');
    return HttpResponse.json(User[1], {
      // 쿠키 넣는 방법
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
  }),

  http.post('/api/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      // 쿠키 없애기 -> 값을 없애버림 + Max-Age=0 추가
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
];
