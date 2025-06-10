import axios from 'axios'
import axiosRetry from 'axios-retry'

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 3000
  })

  axiosRetry(instance, {
    retries: 3,  // 최대 3회 재시도
    retryDelay: (retryCount) => retryCount * 1000,  // 1초 간격
    retryCondition: (error) => {
      return (error.response?.status || 0) >= 500
    }
  })  

  return {
    provide: {
      axios: instance
    }
  }
})
