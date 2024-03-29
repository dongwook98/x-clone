export async function getTrends() {
  console.log('getTrends 실행');

  const res = await fetch(`http://localhost:9090/api/trends`, {
    next: {
      tags: ['trends'], // 넥스트 서버에서 저장한 데이터를 업데이트 해주기 위한 Key, revalidateTag(), revalidatePath()로 가능
    },
    cache: 'no-store', // 넥스트 서버에서 캐시 안하게 설정 (기본적으로 자동 캐시)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
