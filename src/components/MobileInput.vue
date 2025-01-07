<template>
    <input
        name="mobile"
        v-if="isTouchScreenDevice()"
        v-model="playerInput"
        @keydown.delete="mobileBackspace = true"
        ref="inputEl"
        type="text" 
        class="text-sm text-center rounded-md appearance-none outline-none max-w-[1px] text-slate-100 bg-zinc-900 mx-auto opacity-100 z-[-1]" 
        :maxlength="containerText.length">
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';

const store = mainStore()
const {playerInput, containerText, inputEl, mobileBackspace} = storeToRefs(store)
</script>