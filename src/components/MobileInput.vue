<template>
    <input
        name="mobile"
        v-if="getMobileOS()"
        v-model="playerInput"
        ref="inputEl"
        type="text" 
        class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
        :maxlength="containerText.length">
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { getMobileOS } from '../composables/getMobileOS';

const store = mainStore()
const {playerInput, containerText, inputEl} = storeToRefs(store)
</script>