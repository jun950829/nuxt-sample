<template>
  <div class="max-w-md mx-auto p-6 mt-10 border rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4 text-center">로그인</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block mb-1">이메일</label>
        <input v-model="email" class="w-full border p-2 rounded" />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div>
        <label class="block mb-1">비밀번호</label>
        <input type="password" v-model="password" class="w-full border p-2 rounded" />
        <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
      </div>

      <button
        :disabled="!isValid"
        class="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        로그인
      </button>

      <p v-if="loginError" class="text-red-600 mt-2 text-center">{{ loginError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')
const router = useRouter()

// 유효성 검사
watch(email, (val) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = valid.test(val) ? '' : '올바른 이메일 형식이 아닙니다.'
})

watch(password, (val) => {
  passwordError.value = val.length >= 6 ? '' : '비밀번호는 6자 이상 입력해주세요.'
})

const isValid = computed(() => !emailError.value && !passwordError.value && email.value && password.value)

// 로그인 요청 (가짜 API 사용)
async function handleLogin() {
  loginError.value = ''

  const { data, error } = await useFetch('/api/login', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })

  if (error.value || !data.value?.success) {
    loginError.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
    return
  }

  router.push('/dashboard')
}
</script>
