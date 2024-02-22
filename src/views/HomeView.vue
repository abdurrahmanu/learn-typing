<template>
      <Header />
      <Customize v-if="!result" />
      <RouterView />
      <Restart />
</template>

<script setup>
import Header from '../components/Header.vue';
import Customize from '../components/Customize.vue'
import Restart from '../components/Restart.vue';
import { ref, watchEffect, watch } from 'vue';
import {useRouter} from 'vue-router'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = mainStore()
const {switchNext} = store
const {result, config} = storeToRefs(store)

watchEffect(() => {
  if (result.value) {
    router.push({path: 'result'})
  }

  if (!result.value) {
    router.push({path: 'typing'})
  }
})


watch(config, (newVal, oldVal) => {
  switchNext(newVal)
}, {deep: true})
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
