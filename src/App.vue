<template>
  <div :class="[appTheme]" class="font-light selection:bg-none home max-w-[1500px] m-auto relative min-h-[100dvh] container overflow-y-auto scroll-smooth noscrollbar">
    <div class="min-h-[100dvh]">
      <Header />
      <main>
        <RouterView />
        <Restart />
        <SwitchModes />
        </main>
      </div>
      <CustomTestModal />
      <Theme />
      <HideElements />
      <Toast :toggle="capsIsOn" right text="CAPSLOCK IS ON" />
      <Animate />
    </div>
</template>

<script setup>
import {onBeforeMount, onMounted, watch, ref} from 'vue'
import Header from './components/Header.vue'
import Toast from './components/Toast.vue'
import SwitchModes from './components/SwitchModes.vue';
import Restart from './components/Restart.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import HideElements from './components/HideElements.vue'
import { storeToRefs } from 'pinia';
import {themeStore}  from './store/themeStore'
import {customizeStore}  from './store/customizeStore'
import { authStore } from './store/authStore';
import {db} from './firebase.js';
import { mainStore } from './store/mainStore';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, getDoc} from 'firebase/firestore'
import { useRoute } from 'vue-router';
import {localStorageConfig} from './composables/getLocalStorageConfig'
import CustomTestModal from './components/CustomTestModal.vue';

const route = useRoute()
const auth = getAuth()

const auth_ = authStore()
const {isAuthenticated, userID, userData } = storeToRefs(auth_)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customize = customizeStore()
const {font, customizers, difficulty } = storeToRefs(customize)

const main = mainStore()
const { containerHeight, capsIsOn } = storeToRefs(main)
const { switchNext} = main

watch(customizers, (newVal) => {
  if (newVal) {
      switchNext(newVal)
  }}, {deep : true})

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     userID.value = user.uid;
//     isAuthenticated.value = true
//     await getDoc(doc(db, 'users', userID.value)).then(data => userData.value = data )
//   } else {
//     isAuthenticated.value = false
//     userID.value = undefined
//     userData.value = {}
//   }
// });

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

window.addEventListener('keydown', event => {
  // if (event.key === 'CapsLock') {
  //   if (event.getModifierState("CapsLock")) {
  //     capsIsOn.value = true
  //   } else {
  //     capsIsOn.value = false
  //   }
  // }
})

onMounted(() => height())
watch(font, (newVal) => height() )
onBeforeMount(() => localStorageConfig())
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

/* @media (prefers-color-scheme: light) {
  .head {
    background: #e20707;
    color: #333;
  }
}

@media (prefers-color-scheme: dark) {
  .head {
    background: #170ebf;
    color: #FFF;
  }
} */

.noscrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>