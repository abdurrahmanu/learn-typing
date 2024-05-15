<template>
    <div :class="[hideElements ? 'pt-32' : 'pt-0']" class="w-[90%] min-h-[150px] space-y-1 relative transition-none  max-w-[900px] m-auto">
        <MobileInput />
        <div :class="[alphabets ? 'px-2 py-1 max-w-[300px]' : 'max-w-[600px]', hideElements ? 'text-center' : 'pt-6']"  class="flex justify-between m-auto">
            <Clock/>
            <Blind />
        </div>
        <div v-if="containerText" :class="[hideElements ? 'text-[20px] md:text-[24px]' : 'text-[17px] md:text-[19px]']" class="leading-6 md:leading-[30px] transition-all duration-100 relative m-auto max-w-[600px] w-full ">
            <div ref="containerRef" @click="getMobileOS() ? inputEl.focus() : ''" :class="[customizers['no-space'] ? 'break-words' : '', alphabets ? 'text-center break-words leading-10': 'text-left', !alphabets && textPosition=== 'center' ? 'text-center' : !alphabets && textPosition=== 'right' ? 'text-right' : 'text-left']" class="relative overflow-y-auto h-fit min-h-fit scroll-smooth noscrollbar max-h-[100px]">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <p @click="searchMovie(movie.quoteAuthor, movie.name)"  v-if="movie.name" class="pt-5 text-xs italic text-right text-slate-500 hover:underline whitespace-nowrap">{{movie.quoteAuthor}} - {{ movie.name }}</p>
            <p  v-if="authoredQuote.author" class="text-xs italic text-right text-slate-500 hover:underline">{{authoredQuote.author}}</p>
            <p v-if="Object.keys(dictionaryData).length" class="text-xs text-right text-slate-500 hover:underline">{{ dictionaryData.wordData.word }}</p>
            <div v-if="!hideElements" class="flex items-center py-3 m-auto  w-[90%] space-x-2">
                <RangeInput />
                <repeat class="w-5" v-if="!alphabets" @click="enableRepeat = !enableRepeat" />
            </div>
        </div>
    </div>
    <TextAlign 
    v-if="!getMobileOS() && !alphabets && !hideElements"
    @align="textPosition = $event" 
    :textPosition="textPosition" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import repeat from './svg/repeat.vue';
import MobileInput from'./MobileInput.vue'
import TextAlign from './TextAlign.vue'
import Blind from './Blind.vue';
import Clock from './Clock.vue'
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'
import { countdownStore } from '../store/countdownStore';

const store = mainStore()
const { containerText, previousPlayerInput, resultData,  dictionaryData, alphabets, movie, beatCountdown, gameMode, enableRepeat, playerInputLength, playerInput, authoredQuote, scrollTextContainer, inputEl} = storeToRefs(store)
const {generateText, getMobileOS, playerInputTyping, managePlayerInput, sessionComplete, playerTyping} = store

const containerRef = ref(null)
const textPosition = ref('left')
const customize = customizeStore()
const { customizers, hideElements} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

watch(scrollTextContainer, (newVal)=> {
    if (Object.keys(newVal).length) {
        containerRef.value.scrollTo({
            top: newVal.top
        })
    } else {
        containerRef.value.scrollTo({
            top: 0
        })
    }
}, {deep: true})

const searchMovie = (author, movie) => {
    window.open(`https://google.com/search?q=${author}+${movie}`, '_blank')
}

watch(countdown, (newVal) => {
    if (newVal === 0 && resultData.value.totalTime) {
        beatCountdown.value = false
        sessionComplete()
    }
})

watch(playerInput, (newVal, oldVal) => {
    previousPlayerInput.value = oldVal
    managePlayerInput()
})

onMounted(() => {
    generateText(customizers.value)
    if (getMobileOS()) {
        inputEl.value.focus()
        window.addEventListener('input', playerInputTyping)
    }
    else {
        window.addEventListener('keypress', playerTyping)
        window.addEventListener('keydown', playerTyping)
    }
})
</script>

<style scoped>
.noscrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>