<template>
    <div v-if="!hasCompletedSession" class="m-auto max-w-[1500px] lg:flex pt-10 pb-5"> 
      <div class="w-[100%] mx-auto flex-none space-y-2">   
        <CompletionRange v-if="isBlindMode" />
        <CompletionRangeWithErrors v-if="!isBlindMode" />
        <Customize />
        <TestContainer />
      </div>
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Customize from '../components/Customize.vue'
import CompletionRange from '../components/CompletionRange.vue';
import CompletionRangeWithErrors from '../components/CompletionRangeWithErrors.vue';

import useWatchers from '../composables/useWatchers';
import useEventListener from '../composables/useEventLIstener';

import { connectStore } from '../store/connectStore';
import { nextStore } from '../store/nextStore';
import { mainStore } from '../store/mainStore';
import {customizeStore}  from '../store/customizeStore'
import { typingStateStore } from '../store/typingStateStore';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import preventScroll from '../composables/preventScroll'
import preventKeyBoardScroll from '../composables/preventKeyBoardScroll'
import inputEvent from '../composables/inputEvent'
import evaluateInput from '../composables/evaluateInput';
import { useRoute } from 'vue-router';

const route = useRoute()

const customize = customizeStore()
const {font, settingsToUpdate, toggleCapsToast, pauseTyping, toggleCustomTestModal, isBlindMode} = storeToRefs(customize)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {refocus, focus, playerInput, z, inputEl} = storeToRefs(typingstatestore)

const mainstore = mainStore()
const { testContainerEl, preferredConfigs, hasCompletedSession} = storeToRefs(mainstore)

const connect = connectStore()
const {connectionAvailable } = storeToRefs(connect)

function handleKeydown(event) {
    const eventType = event.inputType || event.key
    const pasteDropReplaceEvents = ['insertFromPaste','insertFromDrop','insertReplacementText']

    if (toggleCustomTestModal.value) return // temporary --------- will fix later


    if (pasteDropReplaceEvents.includes(eventType)) return

    if (pauseTyping.value) {
        focus.value = true
        pauseTyping.value = false
        return
    }
    
    if (eventType === 'Escape' && !hasCompletedSession.value)  {
        goNext.value = true;
        return;
    }

    if (eventType === 'CapsLock') {
        toggleCapsToast.value = true;
        setTimeout(() => {
            toggleCapsToast.value = false;
        }, 2000);
    }

    let value = inputEvent(event)

    if (value) evaluateInput(value);

    // if (focus.value) {
    //     preventKeyBoardScroll(event);
    // }
}

function handleTouchMove(event) {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
        preventScroll(event);
    }
}

function handleWheel(event) {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
        preventScroll(event);
    }
}

function handleBlur() {
    refocus.value = true;
}

function handleFocus() {
    refocus.value = false;
}

function handleOffline() {
    connectionAvailable.value = false;
}

function handleOnline() {
    // DB();
}

function handleClick(event) {
    if (hasCompletedSession.value) return;
    const focusElement = event.srcElement.id === 'focus' || event.srcElement.closest('#focus');
    focusElement ? focus.value = true : focus.value = false;
}

onMounted(() => {
  useEventListener('touchmove', handleTouchMove)
  useEventListener('wheel', handleWheel)
  useEventListener('blur', handleBlur)
  useEventListener('focus', handleFocus)
  useEventListener('offline', handleOffline)
  useEventListener('online', handleOnline)
  useEventListener('keydown', handleKeydown)
  useEventListener('click', handleClick)
  useEventListener('input', handleKeydown, false, inputEl.value)
})

onUnmounted(() => {
  useEventListener('touchmove', handleTouchMove, true)
  useEventListener('wheel', handleWheel, true)
  useEventListener('blur', handleBlur, true)
  useEventListener('focus', handleFocus, true)
  useEventListener('offline', handleOffline, true)
  useEventListener('online', handleOnline, true)
  useEventListener('keydown', handleKeydown, true)
  useEventListener('click', handleClick, true)
  useEventListener('input', handleKeydown, false, inputEl.value)
})

useWatchers({
  focus,
  goNext,
  hasCompletedSession,
  font,
  preferredConfigs,
  toggleCapsToast,
  playerInput,
  settingsToUpdate,
});
</script>