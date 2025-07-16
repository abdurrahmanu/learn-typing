<template>
    <Transition name="slide" appear mode="in-out">
        <div :class="{'z-[999]' : !(showSettings && !isTouchScreenDevice())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99] settings-font" v-if="showSettings">
            <div @click="settingsPage" class="opacity-40 absolute bg-black w-full top-[-100px] bottom-0 right-0 left-0 z-[999]"></div>

            <div class="overflow-y-auto outline-none" :class="[showSettings ? 'absolute right-0 bottom-0 h-[100dvh] max-w-[1000px] w-[100%] sm:w-[80%] z-[9999]' : '', appTheme ]">

                <div class="relative leading-6 text-[15px]">
                    {{ customizers['modes'] }}
                    <Header />
                    <Fonts  v-if="!useValue || searchResult.includes('font')"/>
                    <TextLines v-if="!useValue  || searchResult.includes('test lines')"/>
                    <Cursor  v-if="!useValue  || searchResult.includes('cursor')"/>
                    <Difficulty  v-if="!useValue  || searchResult.includes('difficulty')"/>
                    <BackSpace  v-if="!useValue  || searchResult.includes('backspace')"/>
                    <BlindMode  v-if="!useValue  || searchResult.includes('blind mode')"/>
                    <Blur  v-if="!useValue  || searchResult.includes('blur')"/>
                    <CapsLock v-if="!useValue  || !isMobile() && searchResult.includes('caps lock')"/>
                    <Countdown  v-if="!useValue  || searchResult.includes('countdown')"/>
                    <CustomCase  v-if="!useValue  || searchResult.includes('custom case')"/>
                    <DoubleWords v-if="!useValue  || customizers['modes'] !== 'alphabet-test' && searchResult.includes('double words')"/>
                    <NoSpace v-if="!useValue  || customizers['modes'] !== 'alphabet-test' && searchResult.includes('no space')" />
                    <MovieQuotes v-if="!useValue  || customizers['modes'] !== 'alphabet-test' && searchResult.includes('movie quotes')" />
                    <StopOnError v-if="!useValue  || !isMobile() && searchResult.includes('stop on error')" />
                    <AuthoredQoutes v-if="!useValue  || customizers['modes'] !== 'alphabet-test' && searchResult.includes('quotes')" />
                    <UpperCase v-if="!useValue  || searchResult.includes('uppercase')" />
                    <LetterCombinations v-if="isAlphabetTest && (!useValue  || customizers['modes'] === 'alphabet-test' && searchResult.includes('letter combination'))"/>
                    <Cookies v-if="!useValue  || searchResult.includes('cookies')"/>
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
import UpperCase from './Uppercase.vue'
import CustomCase from './CustomCase.vue'
import NoSpace from './noSpace.vue'
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
import DoubleWords from './DoubleWords.vue'
import TextLines from './TextLines.vue'
import { isMobile } from '../../composables/isMobile'
import { searchStore } from '../../store/searchStore'
import { computed } from 'vue'

const searchstore = searchStore()
const {searchResult, useValue} = storeToRefs(searchstore)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customizestore = customizeStore()
const {customizers, showSettings, } = storeToRefs(customizestore)
const {settingsPage} = customizestore

const isAlphabetTest = computed(() => {
    return customizers.value['modes'] === 'alphabet-test'
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