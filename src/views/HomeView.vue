<template>
  <!-- <div @click="goToProgressPage = true" class="bg-white w-fit">progress</div> -->
  <div class="relative max-h-fit min-h-screen lg:w-full w-[90%] m-auto pt-10 md:pt-[73px] flex flex-col gap-1">
    <headerComponent />
    <div class="relative">
      <RouterView />
    </div>
    <RestartButtonComponent />
  </div>
</template>

<script setup>
import headerComponent from '../components/headerComponent.vue'
import RestartButtonComponent from '../components/restartButtonComponent.vue';
import { ref, watchEffect, watch } from 'vue';
import {useRouter, useRoute} from 'vue-router'
import { typingStore } from '../store/typingStore';
import { storeToRefs } from 'pinia';

const route = useRoute()
const router = useRouter()
const store = typingStore()
const {result, restart, goToProgressPage, startedTyping, customizeProp, textAlign, customizeSettingsProp} = storeToRefs(store)

watchEffect(() => {
  if (result.value) {
    router.push({path: 'result'})
  }

  if (!result.value) {
    router.push({path: 'typing'})
  }
})

watchEffect(() => {
  if (restart.value) {
    setTimeout(() => {
      restart.value = false
    }, 100);
  }
})

watch(customizeProp, (newValue, oldValue) => {
  customizeSettingsProp.value = newValue

  if (newValue.includes('centralize')) {
    textAlign.value = 'text-center'
  } else textAlign.value = ''
}, { deep: true }
)

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
