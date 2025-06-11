<!-- components/InfiniteScroll.vue -->
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.text }}
    </div>
    <div ref="scrollTrigger" class="loading">Loading more...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = ref(
  Array.from({ length: 20 }, (_, i) => ({ id: i, text: `아이템 #${i + 1}` }))
)
const scrollTrigger = ref(null)
let observer

const loadMore = () => {
  const nextItems = Array.from({ length: 10 }, (_, i) => ({
    id: items.value.length + i,
    text: `아이템 #${items.value.length + i + 1}`
  }))
  items.value.push(...nextItems)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 }
  )

  if (scrollTrigger.value) observer.observe(scrollTrigger.value)
})

onUnmounted(() => {
  if (scrollTrigger.value) observer.unobserve(scrollTrigger.value)
})
</script>

<style scoped>
.item {
  padding: 16px;
  border-bottom: 1px solid #ccc;
}
.loading {
  text-align: center;
  padding: 20px;
}
</style>
