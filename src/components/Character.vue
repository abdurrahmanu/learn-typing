<template>
    <div 
    id="focus" 
    aria-hidden="true" 
    ref="charEl"  
    class="relative inline">
        <Cursor :index="currentIndex" />
        <div 
        :class="[!customizers['no-space'] && 'whitespace-pre-wrap']" 
        class="relative inline">
            <span  
            :class="[className, blurStyle, pulseStyle]"
            class="relative transition-opacity duration-75">
                {{ character }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import { customizeStore }  from '../store/customizeStore'
import { typingStateStore } from '../store/typingStateStore';
import { nextStore } from '../store/nextStore';
import { timerStore } from '../store/timerStore';
import Cursor from '../components/Cursor.vue'

const className = ref({
    'text-slate-500': true,
})

const timerstore = timerStore()
const {beatCountdown} = storeToRefs(timerstore)

const typingstatestore = typingStateStore()
const {playerInputLength, testCompleted, playerLastInput, typedWhiteSpaces, spaces, backspaceIsPressed, enterKey} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const { theme } = storeToRefs(theme_)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { currentTest, testContainerEl, charWidth, containerHeight, allSpacesIndex, scrollTextContainer, scrollDistance, lineHeight, fontSize, testLInes } = storeToRefs(mainstore)
const charEl = ref(null)

const {test} = currentTest.value

const customize = customizeStore()
const { customizers, cursorType, blind } = storeToRefs(customize)

const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    character: String,
    index: Number,
})

const currentIndex = computed(() => playerInputLength.value === props.index)
const equality = computed(() => playerLastInput.value === test[props.index])

onMounted(() => {
    charWidth.value = charEl.value.getBoundingClientRect().right - charEl.value.getBoundingClientRect().left
    watch(currentIndex, (isNextChar) => {
        let isLastChar = !isNextChar && playerInputLength.value === test.length
        
        if (isNextChar || isLastChar) {    
            
            if (!backspaceIsPressed.value && test[props.index - 1] === ' ') {
                spaces.value[props.index] = ' '            
            }

            if (backspaceIsPressed.value && test[props.index] === ' ') {
                delete spaces.value[props.index + 1]
            }
             
            if (charEl.value) {    
                const testHeight = containerHeight.value
                const testTop = testContainerEl.value.getBoundingClientRect().top
                const testBottom = testContainerEl.value.getBoundingClientRect().bottom
                const charTop = charEl.value.getBoundingClientRect().top
                const charBottom = charEl.value.getBoundingClientRect().bottom
                const charFullHeight = (fontSize.value * lineHeight.value)
                const charLineHeightTop = (charFullHeight - fontSize.value)/2

                const prevCharBottom = charEl.value.previousElementSibling && charEl.value.previousElementSibling.getBoundingClientRect().bottom 
                const prevCharTop = charEl.value.previousElementSibling && charEl.value.previousElementSibling.getBoundingClientRect().top 
                const nextCharTop = charEl.value.nextElementSibling && charEl.value.nextElementSibling.getBoundingClientRect().top

                const bottomLine = charBottom + charLineHeightTop >= testBottom
                const lastScrolledLine = charTop <= testTop && nextCharTop > testTop

                const nextCharIsNextLine = nextCharTop > prevCharBottom
                const firstCharInNextLIne = nextCharTop > prevCharBottom  && charTop === nextCharTop        
                const lastCharInPrevLine = nextCharTop > charBottom && charTop === prevCharTop

                nextCharIsNextLine ? enterKey.value = true : enterKey.value = false

                if (firstCharInNextLIne) {
                    if (!backspaceIsPressed.value) {
                        if (bottomLine) {
                            scrollDistance.value += testHeight * ((testLInes.value - 1) || 1)/testLInes.value
                            scrollTextContainer.value = {
                                top: scrollDistance.value
                            }
                        }
                    }
                }

                if (lastCharInPrevLine) {
                    if (backspaceIsPressed.value) {
                        if (lastScrolledLine) {
                            scrollDistance.value -= testHeight * ((testLInes.value - 1) || 1)/testLInes.value
                            scrollTextContainer.value = {
                                top: scrollDistance.value
                            }
                        }
                    }
                }
            }

            if (playerInputLength.value === test.length) {
                if (customizers.value['timer']) beatCountdown.value = true
                testCompleted.value = true
            }
        }
    })
})

watch([currentIndex, blind, goNext], ([newCurrent, newBlind, newNext]) => {

    className.value = {
        // UNTYPED CHARS
        'text-slate-500': theme.value === 'dark' && props.index > playerInputLength.value,
        'text-zinc-500': theme.value === 'white' && props.index > playerInputLength.value,

        // CORRECT CHARS
        'text-green-400': !blind.value && !newCurrent && equality.value && theme.value === 'dark'&& !blind.value,
        'text-green-500': !blind.value && !newCurrent && equality.value && theme.value === 'white' && !blind.value,
        
        // INCORRECT CHARS
        'text-red-500': !blind.value && !currentIndex.value && !equality.value && theme.value === 'dark',
        'text-red-600': !blind.value && !currentIndex.value && !equality.value && theme.value === 'white',

        'opacity-100 animate-pulse' : (cursorType.value === 'pulse' || cursorType === 'word-pulse') && props.character === ' ',
    }
})

const blurStyle = computed(() => {
    if (customizers.value['blur']) {        
        return allSpacesIndex.value[typedWhiteSpaces.value + 1] && props.index > allSpacesIndex.value[typedWhiteSpaces.value + 1] ? 'blur-[7px]' : props.index > allSpacesIndex.value[typedWhiteSpaces.value] ? 'blur-[1px]' : ''
    }
})

const pulseStyle = computed(() => {
    if (cursorType.value === 'word-pulse') {        
        return (
            typedWhiteSpaces.value === 0 && props.index < allSpacesIndex.value[0] + 1
        ) || 
        (
            allSpacesIndex.value[typedWhiteSpaces.value - 1] + 1 &&
            props.index > allSpacesIndex.value[typedWhiteSpaces.value -1] + 1 &&
            props.index < allSpacesIndex.value[typedWhiteSpaces.value] + 1
        ) ||
        (
            props.index > allSpacesIndex.value[allSpacesIndex.value.length - 1] + 1 &&
            typedWhiteSpaces.value === allSpacesIndex.value.length
        ) ?
        'word-pulse ring-transparent' :
        ''
    }
})

</script>

<style scoped>
.word-pulse {
    transition: all 2s ease;
    animation: wordpulse 2s infinite;
}

@keyframes wordpulse {
    0% {
        opacity: 70%
    }
    50% {
        opacity: 45%;
    }
    100% {
        opacity: 70%;
    }
}


.pulse {
    transition: all 1.5s ease;
    animation: pulse 1.5s infinite;
}


@keyframes pulse {
    0% {
        opacity: 70%
    }
    50% {
        opacity: 40%;
    }
    100% {
        opacity: 70%;
    }
}

.smooth-cursor-forward {
    transition: all 0.1s ease-out;
    animation: forward 0.1s ease-out;
}

@keyframes forward {
    0% {
        transform: translateX(-70%)
    }
    100% {
        transform: translateX(0%);
    }
}

.smooth-cursor-backward {
    transition: all 0.2s ease;
    animation: backwards 0.2s ease;
}

@keyframes backwards {
    0% {
        transform: translateX(80%)
    }
    100% {
        transform: translateX(0%);
    }
}
</style>



















