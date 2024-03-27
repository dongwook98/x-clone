// 클라이언트 컴포넌트에서 서버 액션 사용
'use server'; // 서버 액션 사용하려면 작성

import { signIn } from '@/auth'; // 서버에서 로그인 처리
import { redirect } from 'next/navigation';

const onSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }

  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name' };
  }

  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }

  if (!formData.get('image')) {
    return { message: 'no_image' };
  }

  let shouldRedirect = false; // try catch문에서 redirect 사용 못해서 변수 생성
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: 'post',
        body: formData,
        credentials: 'include', // 이게 있어야 쿠키 전달 가능
      }
    );
    console.log(response.status);
    // 백엔드 서버에서 문제 발생 시 처리
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json());
    shouldRedirect = true;
    // 회원가입 성공 시 바로 로그인해줌
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false, // 서버 리다이렉트 꺼줌
    });
  } catch (error) {
    console.error(error);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect('/home'); // try catch문 안에서 X
  }
};

export default onSubmit;
