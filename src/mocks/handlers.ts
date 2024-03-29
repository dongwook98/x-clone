import { http, HttpResponse, StrictResponse } from 'msw';
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
  // 로그인 api
  http.post('/api/login', () => {
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

  // 로그아웃 api
  http.post('/api/logout', () => {
    return new HttpResponse(null, {
      // 로그아웃이니까 쿠키 없애기 -> 값을 없애버림 + Max-Age=0 추가
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),

  // 회원가입 api
  http.post('/api/sign-up', () => {
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

  // 추천 게시글 리스트 조회 api
  http.get('/api/postRecommends', ({ request }) => {
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

  // 유저가 팔로잉한 게시글 리스트 조회 api
  http.get('/api/followingPosts', ({ request }) => {
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

  // 검색 게시글 리스트 조회 api
  http.get('/api/search/:tag', ({ request, params }) => {
    const { tag } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: users[0],
        content: `${1}  검색결과 ${tag}`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: users[1],
        content: `${2}  검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: users[2],
        content: `${3} 검색결과 ${tag}`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: users[1],
        content: `${4}  검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: users[2],
        content: `${5}  검색결과 ${tag}`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),

  // 유저의 게시글 리스트 조회 api
  http.get('/api/users/:userId/posts', ({ request, params }) => {
    console.log('나의 게시글 API 요청');

    const { userId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: users[0],
        content: `${1} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: users[0],
        content: `${2} ${userId}의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: users[0],
        content: `${3} ${userId}의 게시글`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: users[0],
        content: `${4} ${userId}의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: users[0],
        content: `${5} ${userId}의 게시글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),

  // 유저 정보 조회 api
  http.get('/api/users/:userId', ({ request, params }): StrictResponse<any> => {
    const { userId } = params;
    const found = users.find((v) => v.id === userId);
    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json(
      { message: 'no_such_user' },
      {
        status: 404,
      }
    );
  }),

  // 상세 게시글 조회 api
  http.get('/api/posts/:postId', ({ request, params }): StrictResponse<any> => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json(
        { message: 'no_such_post' },
        {
          status: 404,
        }
      );
    }
    return HttpResponse.json({
      postId,
      User: users[0],
      content: `${1} 게시글 아이디 ${postId}의 내용`,
      Images: [
        { imageId: 1, link: faker.image.urlLoremFlickr() },
        { imageId: 2, link: faker.image.urlLoremFlickr() },
        { imageId: 3, link: faker.image.urlLoremFlickr() },
      ],
      createdAt: generateDate(),
    });
  }),

  // 게시글의 답글 리스트 조회 api
  http.get('/api/posts/:postId/comments', ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: users[0],
        content: `${1} ${postId}의 게시글의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: users[1],
        content: `${2} ${postId}의 게시글의 답글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: users[2],
        content: `${3} ${postId}의 게시글의 답글`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: users[1],
        content: `${4} ${postId}의 게시글의 답글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: users[2],
        content: `${5} ${postId}의 게시글의 답글`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),

  // 팔로우 추천 리스트 조회 api
  http.get('/api/followRecommends', ({ request }) => {
    return HttpResponse.json(users);
  }),

  // 트렌드 리스트 조회 api
  http.get('/api/trends', ({ request }) => {
    return HttpResponse.json([
      { tagId: 1, title: '해시태그1', count: 1234 },
      { tagId: 2, title: '해시태그2', count: 1234 },
      { tagId: 3, title: '해시태그3', count: 1234 },
      { tagId: 4, title: '해시태그4', count: 1234 },
      { tagId: 5, title: '해시태그5', count: 1234 },
      { tagId: 6, title: '해시태그6', count: 1234 },
      { tagId: 7, title: '해시태그7', count: 1234 },
    ]);
  }),
];
