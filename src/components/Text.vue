<template>
    <div class="text-slate-100 h-full w-[90%] min-h-[200px] p-5 px-3 space-y-10 relative transition-all duration-200 max-w-[900px] m-auto">
        <input 
        ref="inputEl"
        type="text" 
        class="text-lg text-center rounded-md outline-none w-fit h-9 text-slate-500 max-w-[100px] bg-zinc-800 block mx-auto my-2" 
        :maxlength="!startedTyping ? 6 : 1" 
        :placeholder="!startedTyping ? 'START' : ''"  
        :value="playerLastInput">

        <div v-if="containerText" class="leading-6 md:leading-[40px] transition-all duration-100 relative md:text-xl border-l-3 border-l-zinc-800 pl-4 w-fit m-auto" @click="inputEl.focus()">
            <div>
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                @unequal="wrongCount++"
                @equal="correctCount++"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput.at(index) === alphabet"
                :alphabet="alphabet"/>
            </div>
            <RangeInput />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const inputEl = ref(null)
const store = mainStore()
const { containerText, startedTyping, playerLastInput , playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping} = store

onMounted(() => {
    generateText()
    if (inputEl.value instanceof HTMLElement) inputEl.value.focus()
    window.addEventListener('keypress', event => playerTyping(event) )
})
</script>











