<template>
  <div>
    <h2>🔄 API 자동 재시도 UI</h2>
    <button @click="fetchWithRetry">API 호출</button>

    <div v-if="loading">⏳ 요청 중... ({{ retryCount }}회 시도 중)</div>
    <div v-if="error">❌ 오류: {{ error }}</div>
    <div v-if="data">✅ 응답: {{ data }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref('')
const error = ref('')
const loading = ref(false)
const retryCount = ref(0)

const { $axios } = useNuxtApp()

async function fetchWithRetry() {
  data.value = ''
  error.value = ''
  loading.value = true
  retryCount.value = 0

  try {
    const response = await $axios.get('/hello', {
      // Axios 이벤트 후킹 (재시도 마다 카운트 증가)
      onDownloadProgress: () => retryCount.value++
    })
    data.value = response.data.message
  } catch (err) {
    error.value = err.message || '에러 발생'
  } finally {
    loading.value = false
  }
}
</script>
