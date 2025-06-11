<!-- pages/index.vue -->
<template>
  <div>
    <button @click="scrollToSection">특정 섹션으로 이동</button>

    <div style="height: 1000px">스크롤 내려가는 영역</div>

    <div ref="targetSection" class="target-section">
      🎯 여기가 타겟 섹션입니다!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const targetSection = ref(null)

const scrollToSection = () => {
  targetSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.target-section {
  padding: 40px;
  background-color: #f0f0f0;
  border: 2px solid #999;
}
</style>
