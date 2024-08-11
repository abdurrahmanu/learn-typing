<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none  max-w-[900px] m-auto" :class="[!hideElements ? 'min-[1350px]:pt-10' : 'min-[1350px]:pt-16']">
        <div :class="[isMobileOS() ? 'flex' : 'block']" class="relative h-fit min-h-[30px]  max-w-[1500px] m-auto py-1">            
            <MobileInput />
            <div class="w-fit h-fit"> 
                <Restart v-show="!hasCompletedSession && playerInputLength" @click="restart" class="absolute w-6 left-[50%] translate-x-[-50%] py-2"/>
            </div>
            <Countdown 
                class="absolute right-0"
                v-show="timedTyping && beginCountdown && isMobileOS() && start" 
                :length="countdown" 
                :start="beginCountdown" 
                :cancel="timedTyping"
                :animate="true"
                :interval="1000" />
        </div>
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[700px] w-full">
            <div aria-d
            escribedby="full-text" ref="testContainerEl"  :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] ? 'break-words' : '', alphabetsMode_ ? 'text-center break-words': 'text-left', !alphabetsMode_ && textPosition=== 'center' ? 'text-center' : !alphabetsMode_ && textPosition=== 'right' ? 'text-right' : 'text-left', ] " class="overflow-y-auto scroll-smooth noscrollbar leading-[1.4] h-fit py-[1px] outline-none">
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
        <p class=" text-sm bg-transparent blur-[1px] w-fit whitespace-nowrap m-auto flex" v-if="isMobileOS() && !focus" ><span class="pr-1">click</span><upwardsFinger class="relative w-5 bottom-1" />test to focus cursor</p>               
    </main>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { isMobileOS } from '../composables/isMobileOS';
import upwardsFinger from './svg/upwardsFinger.vue';
import Countdown from './Countdown.vue';
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
import { useRoute } from 'vue-router';

const route = useRoute()
const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const store = mainStore()
const { containerText, mobileBackspace, wrongCount, previousPlayerInput, beginCountdown, timedTyping, hasCompletedSession, focus, resultData, testContainerEl, containerHeight, movie, beatCountdown, playerInputLength, playerInput, authoredQuote, scrollTextContainer, restartSvgEl, restartEl, inputEl} = storeToRefs(store)
const { sessionComplete, switchNext} = store

const customize = customizeStore()
const { customizers, hideElements, font, textPosition} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const count = countdownStore()
const {countdown, start} = storeToRefs(count)
const {clearCounter} = count

const restart = async () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart')
}

watch(scrollTextContainer, (newVal, oldVal)=> {
    if (testContainerEl.value instanceof HTMLElement) {
        if (Object.keys(newVal).length) {
            testContainerEl.value.scrollTo({
                top: newVal.top
            })
            
        } else {
            testContainerEl.value.scrollTo({
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
    if (mobileBackspace.value && wrongCount.value === 0) {
        playerInput.value = oldVal
        mobileBackspace.value = false
        return
    }
    previousPlayerInput.value = oldVal
    managePlayerInput()
})

onMounted(() => {
    window.addEventListener('keydown', event => {
        if (event.target === testContainerEl.value) {
            preventKeyBoardScroll(event)
        }
    }, false)

    window.addEventListener('touchmove', event => {
        if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
            preventScroll(event)
        }
    }, {passive: false})

    window.addEventListener('wheel', event => {
        if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
            preventScroll(event)
        }
    }, {passive: false})
    
    if (!containerText.value) generateTest(customizers.value, null)
    if (route.name === 'home') {
        if (isMobileOS()) {
            focus.value = true
            inputEl.value.focus()
            inputEl.value.addEventListener('input', mobileInputEvent)
            window.addEventListener('click', event => {
                if (testContainerEl.value instanceof HTMLElement) {                    
                    if (event.srcElement !== testContainerEl.value && !testContainerEl.value.contains(event.srcElement) && event.srcElement !== restartEl.value && !restartEl.value.contains(event.srcElement) && event.srcElement !== restartSvgEl.value) {
                        inputEl.value.blur()
                        focus.value = false
                    } else {
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
    }
})

const preventKeyBoardScroll = (e) => {
        if ([38, 40].includes(e.keyCode)) {
            e.preventDefault();
            return false;
        }
}

const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}
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