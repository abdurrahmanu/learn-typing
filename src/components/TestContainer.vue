<template>
    <main class="w-[90%] min-h-[150px] space-y-[3px] relative transition-none  max-w-[900px] m-auto xl:pt-10" :class="[hideElements ? 'pt-5 xl:pt-24' : 'pt-5']">
        <MobileInput />
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[700px] w-full py-6">
            <div aria-describedby="full-text" ref="containerRef" @click="getMobileOS() ? inputEl.focus() : ''" :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] ? 'break-words' : '', alphabetsMode_ ? 'text-center break-words': 'text-left', !alphabetsMode_ && textPosition=== 'center' ? 'text-center' : !alphabetsMode_ && textPosition=== 'right' ? 'text-right' : 'text-left', ] " class="overflow-y-auto scroll-smooth noscrollbar leading-[1.4] h-fit py-[1px]  ring-opacity-20">
                <p id="full-text" class="hidden">{{ containerText }}</p>
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <div class="min-h-[16px] font-medium">
                <p v-show="movie.name" :class="[theme === 'dark' ? 'text-white' : 'text-black']" class="pt-5 text-xs italic text-right text-slate-500 whitespace-nowrap">{{movie.quoteAuthor}} - {{ movie.name }}</p>
                <p  v-show="authoredQuote.author" class="text-xs italic text-right text-slate-500">{{authoredQuote.author}}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { getMobileOS } from '../composables/getMobileOS';
import MobileInput from'./MobileInput.vue'
import Alphabet from './Alphabet.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'
import { countdownStore } from '../store/countdownStore';
import { fontStore } from '../store/fontStore';
import { themeStore } from '../store/themeStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { generateTest } from '../composables/generateTest';
import {managePlayerInput} from '../composables/managePlayerInput'
import {mobileInputEvent} from '../composables/mobileInputEvent'
import {inputEvent} from '../composables/inputEvent'

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const store = mainStore()
const { containerText, previousPlayerInput, textPosition, resultData, containerRef, containerHeight, movie, beatCountdown, playerInputLength, playerInput, authoredQuote, scrollTextContainer, inputEl} = storeToRefs(store)
const { sessionComplete} = store
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
        if (Object.keys(newVal).length) {
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

onMounted(() => {
    if (!containerText.value) generateTest(customizers.value, null)
        if (getMobileOS()) {
            inputEl.value.focus()
            inputEl.value.addEventListener('input', mobileInputEvent)
            window.addEventListener('keydown', mobileInputEvent)
        }
        else {
            window.addEventListener('keypress', inputEvent)
            window.addEventListener('keydown', inputEvent)
        }
})

const el = ref(null)
const fragment = ref(document.createDocumentFragment())

onMounted(() => {
    watchEffect(() => {
        for (let index = 0; index <= containerText.value.length; index++) {
            const alpha = `<span  class="border"> ${containerText.value[index]} </span>`  
            let div = ref(document.createElement('div'))
            div.value.innerHTML = alpha
            fragment.value.appendChild(div.value);
        }

        // el.value.appendChild(fragment.value)
        // console.log(el.value);
    })
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