<template>
    <Transition name="container"> 
        <div id="focus" class="relative">
            <focusButton class="fill-parent center-text-xy z-[2] backdrop-blur-[6px] font-bold"/>
            <div
            @click="focusInput"
            aria-describedby="full-text" 
            ref="testContainerEl" 
            class="container-style"
            :style="computedStyle" 
            :class="[ wordBreak, 
            (textPosition === 'justify') && 'text-justify',
            (textPosition === 'left') && 'text-left'] ">                 
                <Character
                v-for="(character, index) in test"
                :index="index"
                :key="index"
                :character="character" />
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
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import focusButton from './focusButton.vue';
import { computed } from 'vue';

const typingstatestore = typingStateStore()
const { focus, inputEl} = storeToRefs(typingstatestore)

const store = mainStore()
const { currentTest, testContainerEl, containerHeight} = storeToRefs(store)

const test = computed(() => {
    return currentTest.value.test
})

const customize = customizeStore()
const { customizers, font, textPosition} = storeToRefs(customize)

const computedStyle = computed(() => {
    return {
        'height' : containerHeight.value + 'px', 
        'font-size': font.value + 'px'
    }
})

const wordBreak = computed(() => {
    return (customizers.value['no-space'] || customizers.value['test-type'] === 'custom' || customizers.value['modes'] === 'alphabet-test') && 'break-words'
})

function focusInput() {
    if (isTouchScreenDevice() && !focus.value) inputEl.value.focus()
}
</script>

<style scoped>
.container-style {
    @apply overflow-hidden scroll-smooth leading-[1.4] outline-none max-w-[95%] mx-auto
}
</style>