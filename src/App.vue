<template>
  <Loader v-if="connectingServer" />
  <Main v-else />
</template>

<script setup>
import {onBeforeMount, onMounted, watch, ref} from 'vue'
import Main from './components/Main.vue'
import Loader from './components/Loader.vue'
import { storeToRefs } from 'pinia';
import {connectStore} from './store/connectStore'
import { mainStore } from './store/mainStore';
import {customizeStore}  from './store/customizeStore'
import {textBoxHeight} from './composables/textBox'
import { countdownStore } from './store/countdownStore';
import { DB } from './composables/connectDB';

const onLoad = ref(undefined)

const customize = customizeStore()
const {font, customizers, toggleCapsToast } = storeToRefs(customize)

const main = mainStore()
const { timedTyping, preferredConfigs, spaceCount, refocus } = storeToRefs(main)
const { switchNext} = main

const count = countdownStore()
const {clearCounter} = count

const connect = connectStore()
const {hasInternetConnection, connectingServer, connectionStrength, showConnectionStrength} = storeToRefs(connect)

onMounted(() => {
  textBoxHeight()
  onLoad.value = !hasInternetConnection.value

  watch(customizers, newVal => {
    if (onLoad.value) {
      if (timedTyping.value) clearCounter()
      if (newVal) switchNext(newVal)    
    }
    else onLoad.value = true
  }, {deep : true})
})

watch(toggleCapsToast, (newVal, oldVal) => newVal ? setTimeout(() => toggleCapsToast.value = oldVal, 5000) : false )
onBeforeMount(() => hasInternetConnection.value ? DB() : false)
watch(font, (newVal) => textBoxHeight())

watch(preferredConfigs, newVal => {
  if (newVal && navigator.onLine && showConnectionStrength.value) {
    connectionStrength.value = 'connected'
    setTimeout(() => {
      showConnectionStrength.value = false
    }, 4000);
  }
})

window.addEventListener('blur', () => refocus.value = true)
window.addEventListener('focus', () => refocus.value = false)
window.addEventListener('offline', () => hasInternetConnection.value = false);
window.addEventListener('online', () => DB(true));
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