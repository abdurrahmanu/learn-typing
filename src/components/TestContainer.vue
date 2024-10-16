<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none  max-w-[900px] m-auto" :class="[isMobileOS() && focus ? 'pt-8' : '']">
        <div :class="[isMobileOS() ? 'flex' : 'block', alphabetsMode_ && !useAlphabetCombination ? 'max-w-[450px]' : 'max-w-[700px]']" class="relative h-fit min-h-[30px] m-auto py-1">      
            <MobileInput />
            <Countdown 
                v-show="(isMobileOS() && focus && timedTyping) || timedTyping"
                class="absolute left-0"
                :length="countdown" 
                :start="beginCountdown" />
            <div class="w-fit h-fit"> 
                <restart v-show="!hasCompletedSession && playerInputLength" @click="restartTest" class="absolute w-6 left-[50%] translate-x-[-50%] "/>
            </div>
        </div>
        <Transition v-if="goNext" name="container">
        <div v-if="containerText" class="transition-all duration-100 relative mx-auto max-w-[700px] w-full min-w-[300px]">
                <div @blur="textIsFocused = false" @focus="textIsFocused = true" tabindex="0" ria-describedby="full-text" ref="testContainerEl"  :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" :class="[ customizers['no-space'] || customizers['test-type'] === 'custom' ? 'break-words' : '', alphabetsMode_ ? 'text-center break-words': 'text-left', !alphabetsMode_ && textPosition=== 'center' ? 'text-center' : !alphabetsMode_ && textPosition=== 'right' ? 'text-right' : 'text-left', !isMobileOS() ? 'overflow-y-auto ' : 'overflow-y-hidden'] " class="overflow-x-hidden scroll-smooth leading-[1.4] h-fit py-[1px] outline-none after:absolute after:top-0 after:bottom-0 after:w-[4px] after:right-[0] after:z-[999] after:bg-transparent">
                    <p id="full-text" class="hidden">{{ containerText }}</p>
                    <Alphabet
                    v-for="index in containerText.length"
                    :index="index"
                    :key="index"
                    :lastIndex = 'index - 1 === containerText.length'
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
        <p class=" text-sm bg-transparent blur-[1px] w-fit whitespace-nowrap m-auto flex" v-if="isMobileOS() && !focus" ><span class="pr-1">click</span><upwardsFinger class="relative w-5 bottom-1" />test to focus cursor</p>
    </main>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { isMobileOS } from '../composables/isMobileOS';
import upwardsFinger from './svg/upwardsFinger.vue';
import Countdown from './Countdown.vue';
import MobileInput from'./MobileInput.vue'
import Alphabet from './Alphabet.vue'
import restart from './svg/restart.vue'
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
const textIsFocused = ref(false)

const alphabets_ = alphabetsStore()
const { alphabetsMode_, useAlphabetCombination } = storeToRefs(alphabets_)

const store = mainStore()
const { containerText, quoteType, goNext, mobileBackspace, wrongCount, previousPlayerInput, beginCountdown, timedTyping, hasCompletedSession, focus, testContainerEl, containerHeight, movie, playerInputLength, playerInput, authoredQuote, scrollTextContainer, restartSvgEl, restartEl, inputEl} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers, mode, font, textPosition, switchMode} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const count = countdownStore()
const {countdown} = storeToRefs(count)
const {clearCounter} = count

const restartTest = async () => {
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
    if (switchMode.value) {
        switchMode.value = false
        return
    }
    managePlayerInput()
})

onMounted(() => {
    if (!containerText.value) generateTest(customizers.value, null)
    
    document.addEventListener('keydown', event => {
        if (textIsFocused.value) preventKeyBoardScroll(event)
    })

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

.container-enter-from {
    transform: translateY(-10%)
}

.container-enter-active,
.container-leave-active {
    transition: all 0.1s ease;
    opacity: .5
}
</style>