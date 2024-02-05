<template>
    <div class="bg-neutral-900 relative min-h-screen m-auto max-w-[1000px]">
      <RouterView />
  </div>
</template>

<script setup>
import {typingStore} from './store/typingStore'
import {useRouter, useRoute} from 'vue-router'
import { storeToRefs } from 'pinia';
import { onMounted, watchEffect } from 'vue';

const route = useRoute()
const router = useRouter()
const store = typingStore()
const {goToProgressPage, result} = storeToRefs(store)

watchEffect(() => {
  if (goToProgressPage.value) {
    router.push('/progress')
  }
})

onMounted(() => {
  
})
</script>