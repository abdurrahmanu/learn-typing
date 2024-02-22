<template>
    <div @click="inputEl.focus()" class="text-slate-100 h-full w-[90%] min-h-[200px] p-3 space-y-5 relative transition-all duration-200 max-w-[900px] m-auto">
        <div class="opacity-0 w-fit">
            <input 
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-500 bg-zinc-900 mx-auto" 
            @keydown.delete.prevent
            :maxlength="containerText.length" >
        </div>

        <div v-if="containerText" class="leading-6 md:leading-[30px] text-sm transition-all duration-100 relative md:text-lg border-l-3 border-l-neutral-800 w-fit m-auto max-w-[600px]" >
            <div>
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <RangeInput />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const inputEl = ref(null)
const store = mainStore()
const { containerText, inputEquality , playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping, getMobileOS} = store

watch(playerInput, () => {
    if (inputEquality.value) correctCount.value ++
    else wrongCount.value++
})

onMounted(() => {
    generateText()
    inputEl.value.focus()

    // if (getMobileOS() !== 'unknown') window.addEventListener('input', playerTyping)
    // else window.addEventListener('keypress', playerTyping)

    window.addEventListener('input', playerTyping)
}) 
</script>