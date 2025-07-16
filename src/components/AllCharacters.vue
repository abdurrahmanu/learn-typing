<template>
    <Transition name="container"> 
    <div 
    v-if="containerText" 
    class="transition-all duration-100 relative mx-auto w-[1000px] max-w-[100%] min-w-[300px]" 
    :class="[((refocus || ((isTouchScreenDevice() && !isMobile()) && !focus)) && theme === 'dark') && 'blur-[2px] bg-[#323437] cursor-pointer opacity-40',
    ((refocus || ((isTouchScreenDevice() && !isMobile()) && !focus)) && theme !== 'dark') && 'blur-[2px] bg-zinc-200 cursor-pointer opacity-40']">
            <div 
            id="focus" 
            tabindex="0" 
            ref="testContainerEl" 
            @blur="focusInput(false)"
            @focus="focusInput(true)" 
            aria-describedby="full-text" 
            class="container-style"
            :style="{'height' : containerHeight + 'px', 'font-size': font + 'px'}" 
            :class="[ (customizers['no-space'] || customizers['test-type'] === 'custom' || customizers['modes'] === 'alphabet-test') && 'break-words', 
            (textPosition === 'center') && 'text-justify',
            (textPosition === 'right') && 'text-right' 
            (textPosition === 'left') && 'text-left'] ">                 
                <Character
                v-for="(character, index) in containerText"
                :index="index"
                :key="index"
                :character="character" />
            </div>
            <div class="min-h-[16px] text-right font-[600] pt-1">
                <p v-if="quoteType === 'movie'" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="text-xs italic text-right">{{movie.quoteAuthor}} - {{ movie.name }}</p>
                <p  v-if="quoteType === 'author'" :class="[theme === 'dark' ? 'text-slate-400' : 'text-black']" class="text-xs italic text-right">{{authoredQuote.author}}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Character from './Character.vue';
import { typingStateStore } from '../store/typingStateStore';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { themeStore } from '../store/themeStore';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { isMobile } from '../composables/isMobile';

const typingstatestore = typingStateStore()
const {refocus, focus, inputEl} = storeToRefs(typingstatestore)

const store = mainStore()
const { containerText, quoteType, testContainerEl, containerHeight, movie, authoredQuote} = storeToRefs(store)

const customize = customizeStore()
const { customizers, font, textPosition} = storeToRefs(customize)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const focusInput = (boolean) => {
    if (boolean) {
        focus.value = true
        if (isTouchScreenDevice()) {
            inputEl.value.focus()
            // navigator.virtualKeyboard.show()
        }
    } 
    else {
        focus.value = false
        if (isTouchScreenDevice()) inputEl.value.blur()
    }
}
</script>


<style scoped>
.container-style {
    @apply overflow-hidden scroll-smooth leading-[1.4] h-fit py-[1px] outline-none after:absolute after:top-0 after:bottom-0 after:w-[4px] after:right-[0] after:z-[999] after:bg-transparent font-[300]
}
</style>