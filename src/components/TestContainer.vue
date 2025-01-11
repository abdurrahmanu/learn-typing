<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none max-w-[900px] m-auto" :class="[isMobile() && focus ? 'pt-8' : '']">
        <div class="relative max-w-[700px] h-fit flex text-[16px] justify-between min-h-[30px] m-auto py-1 px-3">      
            <MobileInput />
            <div class="space-x-[50px]">
                <Countdown 
                    v-show="(isTouchScreenDevice() && focus && timedTyping) || timedTyping"
                    class="absolute left-[20px]"
                    :length="countdown" 
                    :start="beginCountdown" />
            </div>
            <div class="w-fit h-fit"> 
                <restart v-show="!hasCompletedSession && playerInputLength" @click="restartTest" class="absolute w-6 left-[50%] translate-x-[-50%] "/>
            </div>
            <WordCount />
        </div>
        
        <Transition v-if="goNext" name="container">
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[700px] w-full min-w-[300px]" :class="[(refocus || ((isTouchScreenDevice() && !isMobile()) && !focus)) && theme === 'dark' ? 'blur-[2px] bg-[#323437] cursor-pointer opacity-40' : '', (refocus || ((isTouchScreenDevice() && !isMobile()) && !focus)) && theme !== 'dark' ? 'blur-[2px] bg-zinc-200 cursor-pointer opacity-40' : '',]">
                <div @blur="textIsFocused = false" @focus="textIsFocused = true" tabindex="0" ria-describedby="full-text" ref="testContainerEl"  :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] || customizers['test-type'] === 'custom' ? 'break-words' : '', textPosition=== 'center' ? 'text-center' : textPosition=== 'right' ? 'text-right' : 'text-left'] " class="overflow-hidden scroll-smooth leading-[1.4] h-fit py-[1px] outline-none after:absolute after:top-0 after:bottom-0 after:w-[4px] after:right-[0] after:z-[999] after:bg-transparent font-[300]">
                    <p id="full-text" class="hidden">{{ containerText }}</p>
                    <Alphabet
                    v-for="index in containerText.length"
                    :index="index"
                    :key="index"
                    :lastIndex = 'index - 1 === playerInputLength - 1'
                    :currentIndex ="playerInputLength === index - 1" 
                    :equality="playerInput[index - 1] === containerText[index - 1]"
                    :alphabet="containerText[index - 1]"/>
                </div>
                <div class="min-h-[16px] text-right font-[600] pt-1">
                    <p v-if="quoteType === 'movie'" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="text-xs italic text-right">{{movie.quoteAuthor}} - {{ movie.name }}</p>
                    <p  v-if="quoteType === 'author'" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="text-xs italic text-right">{{authoredQuote.author}}</p>
                </div>
            </div>
        </Transition>

        <div v-if="(isTouchScreenDevice() && !focus) || refocus" class="flex mx-auto text-[16px] bg-transparent w-fit whitespace-nowrap">
            <p class="blur-[1px] flex items-center" v-if="isTouchScreenDevice() && isMobile()">Click <upwardsFinger class="w-5" /> test to focus</p>
            <p @click="focusInputElement" class="absolute top-[100px] font-bold left-[50%] translate-x-[-50%]" v-if="isTouchScreenDevice() && !isMobile()">Click test or press any key to focus </p>
            <p class="absolute top-[100px] font-bold left-[50%] translate-x-[-50%]" v-if="!isTouchScreenDevice()">Press any key to focus</p>
        </div>
    </main>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { isMobile } from '../composables/isMobile';
import upwardsFinger from './svg/upwardsFinger.vue';
import Countdown from './Countdown.vue';
import WordCount from './WordCount.vue';
import MobileInput from'./MobileInput.vue'
import Alphabet from './Alphabet.vue'
import restart from './svg/restart.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import { themeStore } from '../store/themeStore';
import { generateTest } from '../composables/generateTest';
import {managePlayerInput} from '../composables/managePlayerInput'
import {mobileInputEvent} from '../composables/mobileInputEvent'
import {inputEvent} from '../composables/inputEvent'
import { useRoute } from 'vue-router';

const route = useRoute()
const textIsFocused = ref(false)

const store = mainStore()
const { containerText, refocus, quoteType, goNext, mobileBackspace, wrongCount, previousPlayerInput, beginCountdown, timedTyping, hasCompletedSession, focus, testContainerEl, containerHeight, movie, playerInputLength, playerInput, authoredQuote, scrollTextContainer, customizeElement, restartSvgEl, restartEl, inputEl} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers, pauseTyping, font, textPosition} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const count = countdownStore()
const {countdown} = storeToRefs(count)
const {clearCounter} = count

const restartTest = async () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart')
}

const focusInputElement = (delay) => {
    if (pauseTyping.value && route.name !== 'home') return
    focus.value = true
    delay ? setTimeout(() => inputEl.value.focus(), 10) : inputEl.value.focus()
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
    }, 
    {deep: true}
)

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
    if (!containerText.value) generateTest(customizers.value, null)
    
    document.addEventListener('keydown', event => {
        if (textIsFocused.value) preventKeyBoardScroll(event)
        if (isTouchScreenDevice() && !focus.value) {
            focusInputElement(true)  
        }
    })

    window.addEventListener('touchmove', event => {
        if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
    }, {passive: false})

    window.addEventListener('wheel', event => {
        if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
    }, {passive: false})
    
    if (route.name === 'home') {
        if (isTouchScreenDevice()) {
            focusInputElement()
            inputEl.value.addEventListener('input', mobileInputEvent)

            window.addEventListener('click', event => {
                if (testContainerEl.value instanceof HTMLElement) {  
                    const isOutsideTestContainer = event.srcElement !== testContainerEl.value && !testContainerEl.value.contains(event.srcElement)
                    const restartElement = event.srcElement === restartEl.value || restartEl.value.contains(event.srcElement) || event.srcElement === restartSvgEl.value
                    const customizerElement = customizeElement.value instanceof HTMLElement && customizeElement.value.contains(event.srcElement)

                    if (!restartElement && !customizerElement && isOutsideTestContainer) {
                        inputEl.value.blur()
                        focus.value = false
                    } else if (!isOutsideTestContainer || restartElement || customizerElement) focusInputElement()   
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

.container-enter-from {
    transform: translateY(10%)
}

.container-enter-active,
.container-leave-active {
    transition: all 0.1s ease;
    opacity: .8
}
</style>