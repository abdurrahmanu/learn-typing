<template>
    <div class="text-slate-100 h-full w-[90%] min-h-[200px] px-5 relative transition-all duration-200 max-w-[800px] m-auto">
        <div class="text-center">                
            <input 
            ref="inputEl"
            type="text" 
            class="text-lg text-center rounded-md outline-none w-fit h-9 text-slate-500 max-w-[100px] bg-zinc-800" 
            :maxlength="!startedTyping ? 6 : 1" 
            :placeholder="!startedTyping ? 'START' : ''"  
            :value="playerLastInput">
        </div>

        <div class="leading-6 md:leading-[40px] transition-all duration-500 relative md:text-xl border-l-4 border-l-zinc-800 pl-4 w-fit m-auto" :class="[textAlign ? 'text-center' : '']" @click="inputEl.focus()">
            <div ref="textContainer">
                <alphabetSpan
                v-for="(alphabet, index) in containerText"
                :key="index"
                :alphabet="alphabet"
                :currentIndex ="playerInputLength === index"
                :equal="    playerLastInput.value === alphabet && playerInputLength.value - 1 === index && playerLastInput.value.length > 0"
                :unequal="playerLastInput.value !== alphabet && playerInputLength.value - 1 === index && playerLastInput.value.length > 0"
                :index="index" />
            </div>
            <RangeInput />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, computed } from 'vue';
import alphabetSpan from './alphabetSpan.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const inputEl = ref(null)
const textContainer = ref(null)
const store = mainStore()
const { containerText, startedTyping, playerLastInput , playerInputLength, textAlign} = storeToRefs(store)
const {generateText, playerTyping} = store

onMounted(() => {
    generateText()
    if (inputEl.value instanceof HTMLElement) { 
        inputEl.value.focus()
    }
})

window.addEventListener('keypress', event => playerTyping(event) )
// watchEffect(() => {
//     if (next.value) {
//         BeginNextSession()
//         generateText()
//     }

//     if (restart.value) {
//         completionLevel.value = 0
//         BeginNextSession()
//         generateText()
//     }
// })
</script>











