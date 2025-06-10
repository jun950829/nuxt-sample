<template>
  <div>
    <h2>🔥 API 상태</h2>

    <div v-if="error" class="error-box">
      <h3>🚨 문제가 발생했습니다</h3>
      <p>{{ getFriendlyErrorMessage(error) }}</p>
    </div>

    <button @click="fetchData">다시 시도하기</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref(null)

async function fetchData() {
  error.value = null
  try {
    await $fetch('/api/hello')
  } catch (err) {
    error.value = err
  }
}

function getFriendlyErrorMessage(err) {
  if (!err) return ''
  if (err.statusCode === 404) return '요청하신 정보를 찾을 수 없습니다.'
  if (err.statusCode === 500) return '서버에 문제가 발생했어요. 잠시 후 다시 시도해 주세요.'
  return '예기치 않은 오류가 발생했습니다.'
}
</script>

<style scoped>
.error-box {
  background-color: #ffe4e4;
  color: #b30000;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
