<template>
    <div class="text-slate-100 h-full w-[90%] min-h-[200px] p-5 px-3 space-y-10 relative transition-all duration-200 max-w-[900px] m-auto">
        <input 
        ref="inputEl"
        type="text" 
        class="text-lg text-center rounded-md outline-none w-fit h-9 text-slate-500 max-w-[100px] bg-zinc-900 caret-white block mx-auto my-1" 
        maxlength="1" 
        :value="playerLastInput">

        <div v-if="containerText" class="leading-6 md:leading-[30px] text-sm transition-all duration-100 relative md:text-lg border-l-3 border-l-zinc-800 w-fit m-auto max-w-[600px]" @click="inputEl.focus()">
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
           +:  {{ correctCount }}
           -:  {{ wrongCount}}
           'full' {{ playerInput }}
           len: {{ playerInputLength }}
           last: {{ playerLastInput }}
           eq: {{ inputEquality }}
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
const { containerText, inputEquality, playerLastInput , playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping} = store

watch(playerInput, () => {
    if (inputEquality.value) correctCount.value ++
    else wrongCount.value++
})

onMounted(() => {

    generateText()
    inputEl.value.focus()
    window.addEventListener('keypress', playerTyping)
}) 
</script>