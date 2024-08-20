<template>
  <div :class="[appTheme]" class="font-light selection:bg-none home max-w-[1500px] m-auto relative min-h-[100dvh] container overflow-y-auto scroll-smooth noscrollbar">
    <div class="min-h-[100dvh]">
      <Header/>
      <main>
        <RouterView />
        <Restart />
      </main>
    </div>
    <div class="absolute bottom-2 right-[270px] w-fit rounded-full bg-neutral-500 p-2" v-if="route.name !== 'about'">
      <about @click="routeToPage('about')" class="w-[11px]" />
    </div>
    <CustomTestModal />
    <SwitchModes />
    <Theme />
    <Animate />
    <Toast left text="Caps lock is disabled, if you want to use it go to settings and enable it" :toggle="capsIsOn" class="py-2 text-xs text-red-300 bg-teal-900 px-7" /> <!-- CAPS LOCK TOAST -->
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, watch, ref} from 'vue'
import about from './components/svg/about.vue';
import Header from './components/Header.vue'
import SwitchModes from './components/SwitchModes.vue';
import Restart from './components/Restart.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import { storeToRefs } from 'pinia';
import {themeStore}  from './store/themeStore'
import {customizeStore}  from './store/customizeStore'
import { mainStore } from './store/mainStore';
import {localStorageConfig} from './composables/getLocalStorageConfig'
import CustomTestModal from './components/CustomTestModal.vue';
import Toast from './components/Toast.vue';
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customize = customizeStore()
const {font, customizers, capsIsOn } = storeToRefs(customize)

const main = mainStore()
const { containerHeight } = storeToRefs(main)
const { switchNext} = main

const routeToPage = (route) => {
    router.push({name: route})
}

watch(customizers, (newVal) => {
  if (newVal) switchNext(newVal)
}, {deep : true})

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

onMounted(() => height())
watch(font, (newVal) => height() )
onBeforeMount(() => localStorageConfig())

watch(capsIsOn, (newVal, oldVal) => {
  if (newVal) {
    setTimeout(() => {
      capsIsOn.value = oldVal
    }, 10000);
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

/* .glow {
  -webkit-box-shadow:0px 0px 112px 50px #ffffff;
  -moz-box-shadow: 0px 0px 112px 50px #ffffff;
  box-shadow: 0px 0px 112px 50px #ffffff;
} */

.box-container {
  perspective: 1000px
}

.noscrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Exo:ital,wght@0,100..900;1,100..900&family=Itim&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Pacifico&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Shadows+Into+Light&display=swap');

.amiri-font {
  font-family: 'Amiri', sans-serif,
}

.settings-font {
  font-family: 'Exo', monospace;
}

.exo-ital {
  font-family: 'Exo:ital', monospace
}

.caveat {
  font-family: "Caveat", cursive;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.pacifico {
  font-family: 'Pacifico', cursive;
  font-weight: 400;
  font-style: normal;
}

.home {
  font-family: 'Roboto Mono', monospace;
}

.redit-font {
  font-family: 'Reddit Mono', sans-serif
}

.stats {
  font-weight: 800;
  font-family: 'Shadows Into Light', cursive;
}

.config {
  font-family: 'Montserrat Alternates', monospace;
}
</style>