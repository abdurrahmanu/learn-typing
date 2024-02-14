<template>
  <div class="pt-14">    
      <Navbar />
      <Customize />
      <RouterView />
      <Restart />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Customize from '../components/Customize.vue'
import Restart from '../components/Restart.vue';
import { ref, watchEffect, watch } from 'vue';
import {useRouter} from 'vue-router'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = mainStore()
const {result, restart, next} = storeToRefs(store)
const {BeginNextSession, generateText} = store

watchEffect(() => {
  if (result.value) {
    router.push({path: 'result'})
  }

  if (!result.value) {
    router.push({path: 'typing'})
  }
})

watchEffect(() => {
  if (next.value) {
    BeginNextSession()
    generateText()
  }
})

watchEffect(() => {
  if (restart.value) {
    setTimeout(() => {
      restart.value = false
    }, 100);
  }
})
</script>

<style scoped>
.scale-up-enter-from {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.scale-up-enter-to {
  width: 1000px;
  height: 1000px;
  opacity: 1;
}

.scale-up-enter-active,
.scale-up-leave-active {
  transition: all ease 600ms;
}

.scale-up-leave-to {
  display: hidden;
}

</style>
