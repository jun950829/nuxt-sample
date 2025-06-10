<template>
  <div>
    <h1>👋 Nuxt API 호출 테스트</h1>

    <div v-if="pending">⏳ 로딩 중...</div>
    <div v-else-if="error">❌ 에러 발생: {{ error.message }}</div>
    <div v-else>
      ✅ 응답: {{ data.message }}
    </div>

    <button @click="refresh">🔄 새로고침</button>
  </div>
</template>

<script setup>
  const { data, pending, error, refresh } = await useFetch('/api/hello')
</script>