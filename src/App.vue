<template>
  <div :class="[appTheme]" class="font-light selection:bg-none home">
    <Animate />
    <div class="min-h-[100dvh]">
      <Header />
      <RouterView />
      <div v-if="route.name == 'home' || route.name == 'result'" class="pt-5">
          <Restart />
        </div>
        <SwitchModes v-if="!hasCompletedSession && route.name === 'home'" />
    </div>
    <Theme />
    <HideElements @click="hideElements = !hideElements" v-if="route.name === 'home' && !gameMode" />
    <Cookies />
    <div class="fixed flex items-center justify-center w-5 h-5 p-1 font-mono border rounded-full left-3 bottom-[14px] border-slate-500">i</div>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, watch} from 'vue'
import Header from './components/Header.vue'
import SwitchModes from './components/SwitchModes.vue';
import Cookies from './components/Cookies.vue';
import Restart from './components/Restart.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import HideElements from './components/HideElements.vue'
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia';
import { customizeStore } from './store/customizeStore';
import {useRoute} from 'vue-router'

const route = useRoute()
const main = mainStore()
const {appTheme, theme,alphabets, alphabetsMode, containerHeight, font, enableBackSpace, customTexts, currentPage, hasCompletedSession, alphabetsCombination, useAlphabetCombination, gameMode, dictionaryMode} = storeToRefs(main)

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
      currentPage.value = 1
      if (localStorage.getItem('dorayi-typing-use-alphabets-combination') === 'true') {
        useAlphabetCombination.value = true
        if (localStorage.getItem('dorayi-typing-alphabet-combination')) {
          alphabetsCombination.value = JSON.parse(localStorage.getItem('dorayi-typing-alphabet-combination'))
        }
      }
    } 

    else if (localStorage.getItem('dorayi-typing-mode') === 'dictionary') {
      currentPage.value = 2
      dictionaryMode.value = true
    }

    else if (localStorage.getItem('dorayi-typing-mode') === 'game') {
      currentPage.value = 3
      gameMode.value = true
    }

    else {
      alphabets.value = false
      currentPage.value = 0
    }
}

  if (localStorage.getItem('alphabets-mode')) alphabetsMode.value = JSON.parse(localStorage.getItem('alphabets-mode'))

  if (localStorage.getItem('dorayi-typing-preferred-config')) {
    let saved = JSON.parse(localStorage.getItem('dorayi-typing-preferred-config'))
    customizers.value = saved[0]
    disableOption.value = saved[1]
  } 
  else localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
  enableBackSpace.value = customizers.value['backspace']
})

const height = () => {
  const div = document.createElement("div");
  const span = document.createElement('p')
  span.style.fontSize = font.value + 'px'
  span.innerText = 'A'
  span.style.lineHeight = '1.4'
  div.style.position = 'fixed'
  div.style.opacity = '0'
  div.appendChild(span)
  document.body.appendChild(div)
  const cssObject = getComputedStyle(div)
  const height = +cssObject.getPropertyValue('height').slice(0, -2)
  containerHeight.value = (height * 3).toFixed(2)
  document.body.removeChild(div)
}

onMounted(() =>height() )
watch(font, (newVal) => height() )
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Exo:ital,wght@0,100..900;1,100..900&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Shadows+Into+Light&display=swap');

/* .home {
  font-family: 'Exo', sans-serif;
} */

/* .home {
  font-family: 'Roboto', sans-serif;
} */

/* .home {
  font-family: 'Shadows+Into+Light', sans-serif;
} */
/* 
.home {
  font-family: 'Reddit', sans-serif
} */

/* .home {
  font-family: 'Montserrat+Alternates, monospace'
} */

.screen-container {
  perspective: 660px;
}

.screen > div {
  transform: rotateX(-80deg) rotateY(0deg);
  transform-style: preserve-3d;
} 

/* .glow {
  -webkit-box-shadow:0px 0px 112px 50px #ffffff;
  -moz-box-shadow: 0px 0px 112px 50px #ffffff;
  box-shadow: 0px 0px 112px 50px #ffffff;
} */

.box-container {
  perspective: 1000px
}
</style>