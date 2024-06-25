<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none  max-w-[900px] m-auto xl:pt-10" :class="[hideElements ? 'pt-4 xl:pt-24' : 'pt-1']">
        <div :class="[isMobileOS() ? 'flex' : 'block']" class="relative h-fit min-h-[25px]">            
            <MobileInput />
            <Restart v-if="!hasCompletedSession && playerInputLength" @click="restart" class="absolute w-6 left-[50%] translate-x-[-50%]"/>
        </div>
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[700px] w-full">
            <div aria-describedby="full-text" ref="containerRef"  :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] ? 'break-words' : '', alphabetsMode_ ? 'text-center break-words': 'text-left', !alphabetsMode_ && textPosition=== 'center' ? 'text-center' : !alphabetsMode_ && textPosition=== 'right' ? 'text-right' : 'text-left', ] " class="overflow-y-auto scroll-smooth noscrollbar leading-[1.4] h-fit py-[1px]  ring-opacity-20">
                <p id="full-text" class="hidden">{{ containerText }}</p>
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <div class="min-h-[16px] font-medium" :class="[customizers['movie-quotes'] || customizers['author-quotes'] ? 'h-10' : '']">
                <p v-show="movie.name" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="pt-5 text-xs italic text-right whitespace-nowrap">{{movie.quoteAuthor}} - {{ movie.name }}</p>
                <p  v-show="authoredQuote.author" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="text-xs italic text-right">{{authoredQuote.author}}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { isMobileOS } from '../composables/isMobileOS';
import MobileInput from'./MobileInput.vue'
import Alphabet from './Alphabet.vue'
import Restart from './svg/restart.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import { themeStore } from '../store/themeStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { generateTest } from '../composables/generateTest';
import {managePlayerInput} from '../composables/managePlayerInput'
import {mobileInputEvent} from '../composables/mobileInputEvent'
import {inputEvent} from '../composables/inputEvent'

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const store = mainStore()
const { containerText, previousPlayerInput, timedTyping, hasCompletedSession, focus, resultData, containerRef, containerHeight, movie, beatCountdown, playerInputLength, playerInput, authoredQuote, scrollTextContainer, inputEl} = storeToRefs(store)
const { sessionComplete, switchNext} = store

const customize = customizeStore()
const { customizers, hideElements, font, textPosition} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const count = countdownStore()
const {countdown} = storeToRefs(count)
const {clearCounter} = count

const restart = () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart')
}

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
        if (isMobileOS()) {
            inputEl.value.focus()
            focus.value = true
            inputEl.value.addEventListener('input', mobileInputEvent)
            window.addEventListener('keydown', mobileInputEvent)
            window.addEventListener('click', event => {
                if (containerRef.value instanceof HTMLElement) {                    
                    if (event.srcElement !== containerRef.value && !containerRef.value.contains(event.srcElement)) {
                        inputEl.value.blur()
                        focus.value = false
                    } else {
                        if (event.srcElement === restartEl.value) console.log('object');
                        inputEl.value.focus()
                        focus.value = true
                    }
                }
            })
        }
        else {
            window.addEventListener('keypress', inputEvent)
            window.addEventListener('keydown', inputEvent)
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