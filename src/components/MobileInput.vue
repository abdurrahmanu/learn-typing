<template>
    <input
    name="mobile"
    v-if="isTouchScreenDevice()"
    v-model="playerInput"
    @keydown.delete="playerInputLength ? mobileBackspace = true : ''"
    ref="inputEl"
    type="text" 
    class="text-sm text-center rounded-md appearance-none outline-none text-slate-100 bg-zinc-900 mx-auto" 
    :maxlength="containerText.length">
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { typingStateStore } from '../store/typingStateStore';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';

const typingstatestore = typingStateStore()
const {playerInput, inputEl, playerInputLength} = storeToRefs(typingstatestore)

const store = mainStore()
const {containerText, mobileBackspace} = storeToRefs(store)
</script>
