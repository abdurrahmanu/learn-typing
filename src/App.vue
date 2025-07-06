<template>
  <Loader v-if="connectingServer" />
  <Main v-else />
</template>

<script setup>
import {onBeforeMount, onMounted} from 'vue'
import Main from './components/Main.vue'
import Loader from './components/Loader.vue'
import { storeToRefs } from 'pinia';
import {connectStore} from './store/connectStore'
import {nextStore} from './store/nextStore'
import { mainStore } from './store/mainStore';
import {customizeStore}  from './store/customizeStore'
import {textBoxHeight} from './composables/textBox'
import { typingStateStore } from './store/typingStateStore';
import { DB } from './composables/connectDB';
import useEventListener from './composables/useEventLIstener';
import useWatchers from './composables/useWatchers';

const typingstatestore = typingStateStore()
const { focus, inputEl} = storeToRefs(typingstatestore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const customize = customizeStore()
const {font, toggleCapsToast} = storeToRefs(customize)

const store = mainStore()
const { preferredConfigs, hasCompletedSession} = storeToRefs(store)

const connect = connectStore()
const {hasInternetConnection, connectingServer} = storeToRefs(connect)

useWatchers({
  focus,
  goNext,
  hasCompletedSession,
  font,
  toggleCapsToast,
  preferredConfigs,
})

useEventListener(document, 'keydown')
useEventListener(window, 'input')
useEventListener(window, 'touchmove')
useEventListener(window, 'wheel')
useEventListener(window, 'blur')
useEventListener(window, 'focus')
useEventListener(window, 'offline')
useEventListener(window, 'online')
useEventListener(window, 'keypress')
useEventListener(window, 'keydown')
useEventListener(window, 'click')
useEventListener(inputEl.value, 'input')

onMounted(() => textBoxHeight())
onBeforeMount(() => hasInternetConnection.value ? DB() : false)
</script>

<style scoped>
.noscrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>

















