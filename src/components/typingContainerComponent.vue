<template>
    <div 
    :class="[!containerText.length ? 'pt-[100px]' : 'pt-12']" 
    class="text-slate-100 h-full w-[90%] min-h-[200px] px-5 relative transition-all duration-200 max-w-[800px] m-auto">

        <div
        class="leading-9 md:leading-[40px] transition-all duration-500 relative md:text-xl border-l-4 border-l-zinc-800 pl-4 "
        :class="[textAlign ? 'text-center' : '']"
        v-if="containerText.length"  >

            <div ref="textContainer">
                <alphabetSpan
                v-for="(alphabet, index) in containerText"
                :key="index"
                :alphabet="alphabet"
                :currentIndex ="playerInputLength === index"
                :index="index" />
            </div>
            <RangeInput  />
        </div>

        <div class="m-auto w-fit h-fit">
            <div class="relative font-serif text-2xl text-center text-slate-400 active:text-white" @click="generateText" v-if="!focusInput && !playerLastInput.length && !next && !sessionCompleted">
                <span class="font-mono text-white active:text-slate-400">start</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import alphabetSpan from './alphabetSpan.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import {typingStore} from '../store/typingStore'

const textContainer = ref(null)
const store = typingStore()
const {next, textAlign, result, restart, startedTyping, completionLevel, focusInput, containerText} = storeToRefs(store)
const { correctCount, wrongCount, playerLastInput , playerInputLength, sessionCompleted, restartTyping, startTime, resultData , totalTime} = storeToRefs(store)
const {BeginNextSession, generateText} = store

watchEffect(() => {
    if (focusInput.value && containerText.value.length && !sessionCompleted.value) {
        
    }
})

window.addEventListener('keypress', e => {
    if (focusInput.value && containerText.value.length && !sessionCompleted.value) {
        playerInputLength.value++
        if (playerInputLength.value === 1) {
            startTime.value = performance.now();
        }

        completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100        
        playerLastInput.value = e.key

        if (playerInputLength.value === containerText.value.length) {
            sessionCompleted.value = true
            startedTyping.value = false
            totalTime.value = performance.now() - startTime.value
            resultData.value = {
                correctCount: correctCount.value,
                wrongCount: wrongCount.value,
                containerText: containerText.value,
                characters: containerText.value.length,
                totalTime: Math.round(totalTime.value),
                testType: 'English-10-words'
            }
            result.value = resultData.value
            setTimeout(() => {                
                resultData.value
            }, 10);
        }
    }
})

watchEffect(() => {
    if (next.value) {
        BeginNextSession()
        generateText()
    }

    if (restart.value) {
        completionLevel.value = 0
        BeginNextSession()
        generateText()
    }
})
</script>











