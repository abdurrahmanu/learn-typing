<template>
    <div  class="m-auto max-w-[1500px] lg:flex pt-10 pb-5"> 
      <div class="w-[100%] mx-auto flex-none space-y-2">   
        <Customize />
        <TestContainer />
      </div>
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Customize from '../components/Customize.vue'

import useWatchers from '../composables/useWatchers';
import useEventListener from '../composables/useEventLIstener';

import { nextStore } from '../store/nextStore';
import { mainStore } from '../store/mainStore';
import {customizeStore}  from '../store/customizeStore'
import { typingStateStore } from '../store/typingStateStore';
import { storeToRefs } from 'pinia';

const typingstatestore = typingStateStore()
const { focus, inputEl} = storeToRefs(typingstatestore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const customize = customizeStore()
const {font, toggleCapsToast} = storeToRefs(customize)

const store = mainStore()
const { preferredConfigs, hasCompletedSession} = storeToRefs(store)

useWatchers({
  focus,
  goNext,
  hasCompletedSession,
  font,
  preferredConfigs,
  toggleCapsToast,
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
</script>
