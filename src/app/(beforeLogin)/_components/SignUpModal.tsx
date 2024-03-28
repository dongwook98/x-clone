import { redirect } from 'next/navigation';
import BackButton from './BackButton';
import styles from './SignUpModal.module.css';

export default function SignUpModal() {
  // 서버 컴포넌트에서 서버 액션 사용 방법
  // 프론트 서버에서 실행되기 때문에 비밀키 값과 같은 코드 작성 가능
  // formData 사용하려면 input name 속성 필요
  const submit = async (formData: FormData) => {
    'use server'; // 서버 액션 사용하려면 작성
    if (!formData.get('id')) {
      return { message: 'no_id' };
    }
    if (!formData.get('name')) {
      return { message: 'no_name' };
    }
    if (!formData.get('password')) {
      return { message: 'no_password' };
    }
    if (!formData.get('image')) {
      return { message: 'no_image' };
    }
    let shouldRedirect = false; // try catch문에서 redirect 사용 못해서 변수 생성
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-up`,
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
    } catch (error) {
      console.error(error);
      return;
    }

    if (shouldRedirect) {
      redirect('/home'); // try catch문 안에서 X
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <BackButton />
          <div>계정을 생성하세요.</div>
        </div>
        <form action={submit}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor='id'>
                아이디
              </label>
              <input
                id='id'
                name='id'
                className={styles.input}
                type='text'
                placeholder=''
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor='name'>
                닉네임
              </label>
              <input
                id='name'
                name='name'
                className={styles.input}
                type='text'
                placeholder=''
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor='password'>
                비밀번호
              </label>
              <input
                id='password'
                name='password'
                className={styles.input}
                type='password'
                placeholder=''
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor='image'>
                프로필
              </label>
              <input
                id='image'
                name='image'
                className={styles.input}
                type='file'
                accept='image/*'
                required
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type='submit' className={styles.actionButton}>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
