<template>
    <div class="relative min-h-[100vh] mx-auto  bg-neutral-900">
      <RouterView />
  </div>
</template>

<script setup>
import {customizeStore} from './store/customizeStore'
import {useRouter} from 'vue-router'
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';

const router = useRouter()
const store = customizeStore()
const {goToProgressPage} = storeToRefs(store)

watchEffect(() => {
  if (goToProgressPage.value) router.push('/progress')
})
</script>