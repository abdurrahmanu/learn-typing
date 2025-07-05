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
import {nextStore} from './store/nextStore'
import { mainStore } from './store/mainStore';
import {customizeStore}  from './store/customizeStore'
import {textBoxHeight} from './composables/textBox'
import { countdownStore } from './store/countdownStore';
import {correctWrongCountStore} from './store/correctWrongCountStore'
import { typingStateStore } from './store/typingStateStore';
import {timerStore} from './store/timerStore'
import { DB } from './composables/connectDB';
import { isMobile } from './composables/isMobile';
import { isTouchScreenDevice } from './composables/isTouchScreenDevice';
import focusInputElement from './composables/focusInputElement';
import preventScroll from './composables/preventScroll';
import preventKeyBoardScroll from './composables/preventKeyBoardScroll';

const onLoad = ref(undefined)

const typingstatestore = typingStateStore()
const {playerInput, playerInputLength, refocus, focus, backspaceIsPressed, textIsFocused} = storeToRefs(typingstatestore)
const {resetTypingState} = typingstatestore

const timerstore = timerStore()
const {clearTimer, wpmTime} = timerstore

const correctWrongCountstore = correctWrongCountStore()
const {clearResult} = correctWrongCountstore

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)
const {switchNext} = nextstore

const customize = customizeStore()
const {font, customizers, toggleCapsToast, pauseTyping } = storeToRefs(customize)

const store = mainStore()
const { preferredConfigs, hasCompletedSession, testContainerEl} = storeToRefs(store)
const {resetToDefault} = store

const count = countdownStore()
const {clearCounter} = count

const connect = connectStore()
const {hasInternetConnection, connectingServer, connectionStrength, showConnectionStrength} = storeToRefs(connect)

onMounted(() => {
  isMobile()
  textBoxHeight()
  onLoad.value = !hasInternetConnection.value

  watch(customizers, (newVal, oldVal) => {
    if (onLoad.value) {
      if (customizers.value['timer']) clearCounter()
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
}, {deep: true})

watch(goNext, newVal => {
  if (newVal) {
    resetToDefault()
    clearResult()
    clearTimer()
    resetTypingState()
    clearCounter()
    switchNext(customizers.value)
  }
})

watch(hasCompletedSession, newVal => {
  if (newVal) {
    wpmTime(hasCompletedSession.value, playerInput.value, playerInputLength.value)
  }
})

document.addEventListener('keydown', event => {
      if (pauseTyping.value) return
      if (textIsFocused.value) preventKeyBoardScroll(event)
      if (isTouchScreenDevice() && !focus.value) focusInputElement(true)  
})

window.addEventListener('input', event => {
    if (event.inputType === 'deleteContentBackward')  backspaceIsPressed.value = true
    else if (event.inputType !== 'deleteContentBackward') backspaceIsPressed.value = false
})

window.addEventListener('touchmove', event => {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
}, {passive: false})

window.addEventListener('wheel', event => {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
}, {passive: false})

window.addEventListener('blur', () => refocus.value = true)
window.addEventListener('focus', () => refocus.value = false)
window.addEventListener('offline', () => hasInternetConnection.value = false);
window.addEventListener('online', () => DB(true));
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

















