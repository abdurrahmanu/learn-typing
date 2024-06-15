<template>
  <div 
  :class="[appTheme]" 
  class="font-light selection:bg-none home">
    <Animate />
    <div class="min-h-[100dvh]">
      <Header />
      <RouterView />
      <div 
      class="pt-5" 
      v-if="route.name == 'home' || route.name == 'result'">
          <Restart />
        </div>
        <SwitchModes 
        v-if="!hasCompletedSession && route.name === 'home' && !hideElements" />
    </div>
    <Theme />
    <HideElements 
    @click="hideElements = !hideElements" 
    v-if="route.name === 'home'" />
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, watch} from 'vue'
import Header from './components/Header.vue'
import SwitchModes from './components/SwitchModes.vue';
import Restart from './components/Restart.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import HideElements from './components/HideElements.vue'
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia';
import { customizeStore } from './store/customizeStore';
import {useRoute} from 'vue-router'
import {themeStore}  from './store/themeStore'
import {fontStore}  from './store/fontStore'
import { authStore } from './store/authStore';
import {db} from './firebase.js';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, getDoc} from 'firebase/firestore'
import {localStorageConfig} from './composables/getLocalStorageConfig'

const auth = getAuth()

const auth_ = authStore()
const {isAuthenticated, userID, userData } = storeToRefs(auth_)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userID.value = user.uid;
    isAuthenticated.value = true
    await getDoc(doc(db, 'users', userID.value)).then(data => {
      userData.value = data
  })
  } else {
    isAuthenticated.value = false
  }
});

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const font_ = fontStore()
const {font } = storeToRefs(font_)

const route = useRoute()
const main = mainStore()
const { containerHeight, hasCompletedSession} = storeToRefs(main)

const customize = customizeStore()
const {hideElements } = storeToRefs(customize)


onBeforeMount(() => localStorageConfig())

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