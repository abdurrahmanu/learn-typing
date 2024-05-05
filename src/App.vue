<template>
  <div :class="[appTheme]">
    <Animate />
    <div class="min-h-[100dvh]">
      <RouterView />
    </div>
    <Theme />
  </div>
</template>

<script setup>
import {onBeforeMount, watch} from 'vue'
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia';

const main = mainStore()
const {appTheme, theme} = storeToRefs(main)

onBeforeMount(() => {
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    theme.value = 'neutral'
  } else {
    theme.value = 'white'
  }
})

watch(theme, (newVal) => {
  if (newVal === 'neutral') {
    localStorage.setItem('theme', 'dark')
  } 

  if (newVal !== 'neutral') {
    localStorage.removeItem('theme')
  }
})
</script>

<style scoped>
.screen-container {
  perspective: 660px;
}

.screen > div {
  transform: rotateX(-80deg) rotateY(0deg);
  transform-style: preserve-3d;
} 

.glow {
  -webkit-box-shadow:0px 0px 112px 50px #ffffff;
  -moz-box-shadow: 0px 0px 112px 50px #ffffff;
  box-shadow: 0px 0px 112px 50px #ffffff;
}

.box-container {
 perspective: 1000px
}
</style>