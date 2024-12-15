<template>
  <Loader v-if="connectingServer" />
  <div v-else :class="[appTheme]" class="font-light selection:bg-none home max-w-[1500px] m-auto relative min-h-[100dvh] container overflow-y-auto scroll-smooth noscrollbar">
    <div class="min-h-[100dvh]">
      <Connectivity v-if="!allSettings"/>
      <Header :class="[demo ? 'opacity-0 hidden' : '']" class="transition-all duration-300"/>
      <main :class="[demo ? 'opacity-0 hidden' : '']" class="transition-all duration-300">
        <RouterView />
        <Next />
      </main>
      <Teach />
      <Cookies />
    </div>
    <Settings />
    <div class="fixed flex items-center gap-3 bottom-2 right-2">      
      <SwitchModes :class="[demo ? 'opacity-0 hidden' : '']" class="self-end mb-[2px] transition-all duration-300" />
      <Theme class="self-end"/>
    </div>
    <CustomTestModal />
    <Animate />
    <CapsLockToast top :toggle="toggleCapsToast" text="CapsLock is on, you cannot use it while it is disabled, enable in settings." />
  </div>

</template>

<script setup>
import {onBeforeMount, onMounted, watch, ref} from 'vue'
import Teach from './components/Teach.vue';
import Settings from './components/Settings/Settings.vue'
import Loader from './components/Loader.vue'
import Cookies from './components/Cookies.vue';
import Connectivity from './components/Connectivity.vue'
import Header from './components/Header.vue'
import SwitchModes from './components/SwitchModes.vue';
import Next from './components/Next.vue';
import Animate from './components/Animate.vue';
import Theme from './components/Theme.vue';
import { storeToRefs } from 'pinia';
import {connectStore} from './store/connectStore'
import {themeStore}  from './store/themeStore'
import {customizeStore}  from './store/customizeStore'
import { mainStore } from './store/mainStore';
import {height} from './composables/testContainerHeight'
import CustomTestModal from './components/CustomTestModal.vue';
import CapsLockToast from './components/Toast.vue';
import { countdownStore } from './store/countdownStore';
import { DB } from './composables/db';

const onLoad = ref(undefined)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customize = customizeStore()
const {font, customizers, toggleCapsToast, allSettings } = storeToRefs(customize)

const main = mainStore()
const { timedTyping, demo, refocus, preferredConfigs} = storeToRefs(main)
const { switchNext} = main

const count = countdownStore()
const {clearCounter} = count

const connect = connectStore()
const {hasInternetConnection, connectingServer} = storeToRefs(connect)

// console.log(navigator.connection.rtt, navigator.connection.downlink, navigator);

window.addEventListener('blur', event => refocus.value = true)
window.addEventListener('focus', event => refocus.value = false)

window.addEventListener('online', () => {
  DB(true) //arg network update event - true
  hasInternetConnection.value = true
});

window.addEventListener('offline', () => hasInternetConnection.value = false);

onMounted(() => {
  hasInternetConnection.value = navigator.onLine 
  !hasInternetConnection.value ? onLoad.value = true : ''
  height()
  watch(customizers, (oldVal, newVal) => {
    if (onLoad.value) {
      if (timedTyping.value) clearCounter()
      if (newVal) switchNext(newVal)    
    }
    else onLoad.value = true
  }, {deep : true})
})

onBeforeMount(() => DB())
watch(font, (newVal) => height() )
watch(toggleCapsToast, (newVal, oldVal) => {
  if (newVal) setTimeout(() => toggleCapsToast.value = oldVal, 5000);
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
  font-family: 'Montserrat Alternates', cursive;
}
</style>