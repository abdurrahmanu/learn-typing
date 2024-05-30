<template>
    <div :class="[hideElements ? 'pt-10' : 'pt-0']" class="w-[90%] min-h-[150px] space-y-[3px] relative transition-none  max-w-[900px] m-auto">
        <MobileInput />
        <div :class="[alphabetsMode_ ? 'px-2 py-1 max-w-[300px]' : 'max-w-[600px]', hideElements ? 'text-center' : 'pt-6']"  class="flex justify-between m-auto">
            <Clock/>
            <CustomText />
            <Blind />
        </div>
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[600px] w-full">
            <div ref="containerRef" @click="getMobileOS() ? inputEl.focus() : ''" :style="{'max-height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] ? 'break-words' : '', alphabetsMode_ ? 'text-center break-words': 'text-left', !alphabetsMode_ && textPosition=== 'center' ? 'text-center' : !alphabetsMode_ && textPosition=== 'right' ? 'text-right' : 'text-left'] " class="overflow-y-auto scroll-smooth noscrollbar leading-[1.4] h-fit py-[1px]">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <p v-if="movie.name" :class="[theme === 'neutral' ? 'text-white' : 'text-black']" class="pt-5 text-xs italic text-right text-slate-500 whitespace-nowrap">{{movie.quoteAuthor}} - {{ movie.name }}</p>
            <p  v-if="authoredQuote.author" class="text-xs italic text-right text-slate-500">{{authoredQuote.author}}</p>
            <p v-if="Object.keys(dictionaryData).length" class="text-xs text-right text-slate-500 hover:underline">{{ dictionaryData.wordData.word }}</p>
            <div v-if="!hideElements" class="flex items-center py-3 m-auto  w-[90%] space-x-2">
                <RangeInput />
                <repeat class="w-5" v-if="!alphabetsMode_" @click="enableRepeat = !enableRepeat" />
            </div>
        </div>
    </div>
    <TextAlign 
    v-if="!getMobileOS() && !alphabetsMode_ && !hideElements"
    @align="textPosition = $event" 
    :textPosition="textPosition" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CustomText from './CustomText.vue'
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
import { fontStore } from '../store/fontStore';
import { themeStore } from '../store/themeStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import {dictionaryStore}  from '../store/dictionaryModeStore';

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)
const {generateAlphabetsTest} = alphabets_

const dictionary = dictionaryStore()
const { dictionaryMode_, dictionaryData, searchFieldIsFocused } = storeToRefs(dictionary)
const {generateDictionaryTest} = dictionary

const store = mainStore()
const { containerText, previousPlayerInput, resultData, focus, containerRef, containerHeight, movie, beatCountdown, enableRepeat, playerInputLength, playerInput, authoredQuote, scrollTextContainer, inputEl} = storeToRefs(store)
const {generateText, getMobileOS, playerInputTyping, managePlayerInput, sessionComplete, playerTyping} = store
const textPosition = ref('left')
const customize = customizeStore()
const { customizers, hideElements} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const count = countdownStore()
const {countdown} = storeToRefs(count)

const font_ = fontStore()
const {font} = storeToRefs(font_)

watch(scrollTextContainer, (newVal, oldVal)=> {
    if (containerRef.value instanceof HTMLElement) {
        if (Object.keys(newVal).length && !dictionaryMode_.value) {
            containerRef.value.scrollTo({
                top: newVal.top
            })
        } else {
            containerRef.value.scrollTo({
                top: 0
            })
        }
    }
}, {deep: true})

const searchMovie = (author, movie) => {
    // window.open(`https://google.com/search?q=${author}+${movie}`, '_blank')
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

watch(searchFieldIsFocused, (newVal) => {
    focus.value = newVal
})

onMounted(() => {
    if (!containerText.value) generateText(customizers.value, null)
        if (getMobileOS()) {
            inputEl.value.focus()
            inputEl.value.addEventListener('input', playerInputTyping)
            window.addEventListener('keydown', playerInputTyping)
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