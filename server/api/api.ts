export default defineEventHandler((event) => {
  return {
    message: '안녕하세요! 이것은 Nuxt API입니다.',
    time: new Date().toISOString()
  }
});

