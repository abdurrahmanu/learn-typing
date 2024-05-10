<template>
        <div v-if="getMobileOS()" class="w-fit">
            <input
            v-model="playerInput"
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
            :maxlength="containerText.length">
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {playerInput, containerText} = storeToRefs(store)
const {getMobileOS} = store
</script>