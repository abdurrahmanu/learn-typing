<template>
  <div :class="[appTheme]">
    <Animate />
    <div class="min-h-[100dvh]">
      <RouterView />
      <div class="pt-5">
          <Restart />
        </div>
    </div>
    <Theme />
    <HideElements @click="hideElements = !hideElements" />
  </div>
</template>

<script setup>
import {onBeforeMount} from 'vue'
import Restart from './components/Restart.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import HideElements from './components/HideElements.vue'
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia';
import { customizeStore } from './store/customizeStore';

const main = mainStore()
const {appTheme, theme,alphabets, alphabetsMode, enableBackSpace, customTexts} = storeToRefs(main)

const customize = customizeStore()
const {hideElements, customizers, disableOption } = storeToRefs(customize)

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

  if (localStorage.getItem('custom-text') ) {
    customTexts.value = JSON.parse(localStorage.getItem('custom-text'))
  }

  if (localStorage.getItem('dorayi-typing-mode')) {
    if (localStorage.getItem('dorayi-typing-mode') === 'alphabets') {
      alphabets.value = true
    } else {
      alphabets.value = false
    }
  }

  if (localStorage.getItem('alphabets-mode')) {
    alphabetsMode.value = JSON.parse(localStorage.getItem('alphabets-mode'))
  }

  
  if (localStorage.getItem('dorayi-typing-preferred-config')) {
    let saved = JSON.parse(localStorage.getItem('dorayi-typing-preferred-config'))
    customizers.value = saved[0]
    disableOption.value = saved[1]
  } 
  else {
    localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
  }

  enableBackSpace.value = customizers.value['backspace']
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