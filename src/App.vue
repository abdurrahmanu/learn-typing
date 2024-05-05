<template>
  <div :class="[appTheme]">
    <Animate />
    <div class="min-h-[100dvh]">
      <RouterView />
    </div>
    <Theme />
    <HideElements @click="hideElements = !hideElements" />
  </div>
</template>

<script setup>
import {onBeforeMount, watch} from 'vue'
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import HideElements from './components/HideElements.vue'
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia';
import { customizeStore } from './store/customizeStore';

const main = mainStore()
const {appTheme, theme} = storeToRefs(main)

const customize = customizeStore()
const {hideElements} = storeToRefs(customize)

onBeforeMount(() => {
  if (!localStorage.getItem('dorayi-typing-theme')) {
    if (localStorage.getItem('theme')) {
      theme.value = 'neutral'
      localStorage.setItem('dorayi-typing-theme', 'dark')
    } else {
      theme.value = 'white'
      localStorage.setItem('dorayi-typing-theme', 'white')
    }
  } else {
    if (localStorage.getItem('dorayi-typing-theme') === 'dark') {
      theme.value = 'neutral'
      localStorage.setItem('dorayi-typing-theme', 'dark')
    } else {
      theme.value = 'white'
      localStorage.setItem('dorayi-typing-theme', 'white')
    }
  }
})

watch(theme, (newVal) => {
  if (newVal === 'neutral') {
    localStorage.setItem('dorayi-typing-theme', 'dark')
  }  else {
    localStorage.setItem('dorayi-typing-theme', 'white')
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