<template>
    <Transition name="slide" appear mode="in-out">
        <div :class="{'z-[999]' : !(allSettings && !isTouchScreenDevice())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99] settings-font" v-if="allSettings">
            <div @click="toggleSettings" class="opacity-40 absolute bg-black w-full top-[-100px] bottom-0 right-0 left-0 z-[999]"></div>
            <div class="overflow-y-auto outline-none" :class="[allSettings ? 'absolute right-0 bottom-0 h-[100dvh] max-w-[800px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-6 text-[15px] pb-5">
                    <Header />
                    <Fonts />
                    <TextLines />
                    <Cursor />
                    <Difficulty />
                    <BackSpace />
                    <BlindMode />
                    <Blur />
                    <CapsLock v-if="!isMobile()" />
                    <Countdown />
                    <CustomCase />
                    <DoubleWords v-if="customizers['modes'] !== 'alphabet-test'" />
                    <NoSpace v-if="customizers['modes'] !== 'alphabet-test'" />
                    <MovieQuotes v-if="customizers['modes'] !== 'alphabet-test'" />
                    <StopOnError v-if="!isMobile()" />
                    <AuthoredQoutes v-if="customizers['modes'] !== 'alphabet-test'" />
                    <UpperCase />
                    <LetterCombinations v-if="customizers['modes'] === 'alphabet-test'"/>
                    <Cookies />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
// import SettingsUI from './SettingsUI.vue'
import Cursor from './Cursor.vue'
import Fonts from './Fonts.vue'
import AuthoredQoutes from './AuthoredQuotes.vue'
import Cookies from './Cookies.vue'
import Header from './Header.vue'
import UpperCase from './UpperCase.vue'
import CustomCase from './CustomCase.vue'
import NoSpace from './NoSpace.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import Countdown from './CountDown.vue';
import MovieQuotes from './MovieQuotes.vue'
import LetterCombinations from './LetterCombinations.vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import {themeStore}  from '../../store/themeStore'
import { isTouchScreenDevice } from '../../composables/isTouchScreenDevice'
import Blur from './Blur.vue'
import Difficulty from './Difficulty.vue'
import CapsLock from './CapsLock.vue'
import StopOnError from './StopOnError.vue'
import {mainStore} from '../../store/mainStore'
import { countdownStore } from '../../store/countdownStore'
import DoubleWords from './DoubleWords.vue'
import {watch} from 'vue'
import TextLines from './TextLines.vue'
import { isMobile } from '../../composables/isMobile'

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const store = mainStore()
const {demo} = storeToRefs(store)
const {switchNext} = store

const counter = countdownStore()
const {clearCounter} = counter

const customize = customizeStore()
const {customizers, allSettings, pauseTyping, } = storeToRefs(customize)

const toggleSettings = () => {
    if (customizers.value['timer']) clearCounter()
    switchNext(customizers.value, 'restart')
    allSettings.value = !allSettings.value
    if (allSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}

watch(demo, newVal => {
    if (newVal && allSettings.value) allSettings.value = false
})
</script>

<style scoped>
.slide-enter-from {
    transform: translateX(100%)
}

.slide-leave-to {
    transform: translateX(100%)
}

.slide-enter-active,
.slide-leave-active {
    transition: all .5s ease;
}
</style>