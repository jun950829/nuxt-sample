<template>
  <div>
    <h2>👋 API 수동 호출</h2>
    <button @click="fetchData">API 호출</button>

    <div v-if="loading">⏳ 로딩 중입니다...</div>
    <div v-if="error">❌ 오류: {{ error }}</div>
    <div v-if="message">✅ 결과: {{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const loading = ref(false)
const error = ref('')

async function fetchData() {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const res = await $fetch('/api/hello')
    message.value = res.message
  } catch (err) {
    error.value = err?.statusMessage || '알 수 없는 오류'
  } finally {
    loading.value = false
  }
}
</script>
