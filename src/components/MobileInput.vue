<template>
    <input
        name="mobile"
        v-if="isMobileOS()"
        v-model="playerInput"
        ref="inputEl"
        type="text" 
        class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
        :maxlength="containerText.length">
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { isMobileOS } from '../composables/isMobileOS';

const store = mainStore()
const {playerInput, containerText, inputEl} = storeToRefs(store)
</script>