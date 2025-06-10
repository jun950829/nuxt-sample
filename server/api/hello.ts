export default defineEventHandler((event) => {
  // 테스트용 에러 발생 확률 추가
  if (Math.random() < 0.3) {
    throw createError({
      statusCode: 500,
      statusMessage: '서버 에러 발생!'
    });
  }

  return {
    message: '안녕하세요, Nuxt에서 API 호출 중입니다.'
  }
});