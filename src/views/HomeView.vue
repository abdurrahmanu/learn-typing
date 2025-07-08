<template>
    <div v-if="!hasCompletedSession" class="m-auto max-w-[1500px] lg:flex pt-10 pb-5"> 
      <div class="w-[100%] mx-auto flex-none space-y-2">   
        <Customize />
        <TestContainer />
        {{ a }}
      </div>
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Customize from '../components/Customize.vue'

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
import { DB } from '../composables/connectDB';
import {ref} from 'vue'

const customize = customizeStore()
const {font, toggleCapsToast} = storeToRefs(customize)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {refocus, focus, playerInput} = storeToRefs(typingstatestore)

const store = mainStore()
const { testContainerEl, preferredConfigs, hasCompletedSession} = storeToRefs(store)

const connect = connectStore()
const {connectionAvailable } = storeToRefs(connect)

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
    DB(true);
}

function handleKeydown(event) {
    if (
        (event.key === 'Escape' && !hasCompletedSession.value) || 
        (event.key === 'Enter' && hasCompletedSession.value)
    ) {
        goNext.value = true;
        return;
    }

    if (focus.value) {
        preventKeyBoardScroll(event);
    }

    let value = inputEvent(event)
    
    if (value) {
        if (value === 'delete') {
            playerInput.value = playerInput.value.slice(0, -1);
        } else {
            playerInput.value += value;
        }
    }

    if (event.key === 'CapsLock') {
        toggleCapsToast.value = true;
        setTimeout(() => {
            toggleCapsToast.value = false;
        }, 2000);
    }
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
})

useWatchers({
  focus,
  goNext,
  hasCompletedSession,
  font,
  preferredConfigs,
  toggleCapsToast,
  playerInput,
});
</script>