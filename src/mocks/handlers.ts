import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { User } from '@/app/model/User';

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const users: User[] = [
  {
    id: 'dongwook98',
    nickname: '강동욱',
    image: '/me.png',
  },
  {
    id: 'yrk7723',
    nickname: '김예리',
    image: '/yeri.jpeg',
  },
  {
    id: 'tain0404',
    nickname: '이태인',
    image: faker.image.avatarGitHub(),
  },
];

const posts = [];

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

  http.post('/api/sign-up', () => {
    console.log('회원가입 API 실행');
    // 실패 응답
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });

    // 성공 응답
    return HttpResponse.text(JSON.stringify('회원가입 성공'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;',
      },
    });
  }),

  http.get('/api/postRecommends', ({ request }) => {
    console.log('postRecommends API 요청');
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        User: users[0],
        content: `${cursor + 1} 추천 게시글 컨텐츠`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        User: users[1],
        content: `${cursor + 2} 추천 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        User: users[2],
        content: `${cursor + 3} 추천 게시글 컨텐츠`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        User: users[1],
        content: `${cursor + 4} 추천 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        User: users[2],
        content: `${cursor + 5} 추천 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),

  http.get('/api/followingPosts', ({ request }) => {
    console.log('followingPosts API 요청');

    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        User: users[0],
        content: `${cursor + 1} 팔로잉 게시글 컨텐츠`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        User: users[1],
        content: `${cursor + 2} 팔로잉 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        User: users[2],
        content: `${cursor + 3}팔로잉 게시글 컨텐츠`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        User: users[1],
        content: `${cursor + 4} 팔로잉 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        User: users[2],
        content: `${cursor + 5} 팔로잉 게시글 컨텐츠`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
];
