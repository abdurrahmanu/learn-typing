<template>
    <Transition name="container"> 
        <div id="focus">
            <!-- <focusButton class="fill-parent center-text-xy z-[1] backdrop-blur-[6px] font-bold"/> -->
            <div
            id="focus"
            @click="focusInput"
            aria-describedby="full-text" 
            ref="testEl" 
            class="container-style"
            :style="style" 
            :class="[ wordBreak, borderStyle,
            (textPosition === 'center') && 'text-center',
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
import { settingsStore } from '../store/settingsStore';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import focusButton from './focusButton.vue';
import { computed } from 'vue';

const typingstatestore = typingStateStore()
const { inputEl} = storeToRefs(typingstatestore)

const mainstore = mainStore()
const { currentTest, testEl} = storeToRefs(mainstore)

const test = computed(() => {
    return currentTest.value.test
})

const setttingstore = settingsStore()
const { settings, textPosition, testStyle, testHeight, contentFitHeight} = storeToRefs(setttingstore)

const wordBreak = computed(() => {
    return (settings.value['no-space'] || settings.value['test-type'] === 'custom' || settings.value['test-type'] === 'characters') && 'break-words'
})

const borderStyle = computed(()=> {
    return settings.value['show-border'] && 'ring-[1px] ring-neutral-900 rounded-md'
})

function focusInput() {
    if (isTouchScreenDevice()) {
        inputEl.value.focus()
    }
}

const style = computed(() => ({
    ...testStyle.value,
    'height': contentFitHeight.value + 'px',
    'max-height': `min(${testHeight.value}px, ${contentFitHeight.value}px)`
}))
</script>

<style scoped>
.container-style {
    @apply scroll-smooth px-2 mx-auto overflow-hidden
}
</style>