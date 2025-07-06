<template>
    <div aria-hidden="true" ref="currentCharacterElement"  class="relative inline">
        <div v-if="currentIndex" class="inline-block h-[calc(100%_-_5px)] absolute left-0 bottom-0 right-0" :class="[cursorStyle, currentIndex && !backspaceIsPressed ? 'smooth-cursor-forward' : 'smooth-cursor-backward']"></div>
        <div :class="[!customizers['no-space'] && 'whitespace-pre-wrap']" class="relative inline">
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

const className = ref({
    'text-slate-500': true,
})

const typingstatestore = typingStateStore()
const {playerInputLength, playerInput, typedWhiteSpaces, focus, spaces, backspaceIsPressed, enterKey} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const { theme } = storeToRefs(theme_)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const store = mainStore()
const { containerText, testContainerEl, allSpacesIndex, scrollTextContainer, scrollDistance, containerHeight } = storeToRefs(store)
const currentCharacterElement = ref(null)

const customize = customizeStore()
const { customizers, cursorType, font, blind, repeat } = storeToRefs(customize)

const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    character: String,
    index: Number,
})

const currentIndex = computed(() => playerInputLength.value === props.index)
const equality = computed(() => playerInput.value[props.index] === containerText.value[props.index])

onMounted(() => {
    watch(currentIndex, newVal => {
        if (newVal) {      
            if (!backspaceIsPressed.value && containerText.value[props.index - 1] === ' ') spaces.value[props.index] = ' '            
            if (backspaceIsPressed.value && containerText.value[props.index] === ' ') spaces.value[props.index] ? delete spaces.value[props.index] : ''
            
            if (currentCharacterElement.value) {    
                const parentScrollHeight = testContainerEl.value.scrollHeight
                const parentHeight = testContainerEl.value.getBoundingClientRect().height
                const cursorTopOffset = currentCharacterElement.value.getBoundingClientRect().top
                const parentTopOffset = testContainerEl.value.getBoundingClientRect().top
                const cursorBottomOffset = currentCharacterElement.value.getBoundingClientRect().bottom
                const parentBottomOffset = testContainerEl.value.getBoundingClientRect().bottom
                const lineHeight = currentCharacterElement.value.getBoundingClientRect().bottom - currentCharacterElement.value.getBoundingClientRect().top
                const prevSiblingBottomOffset = props.index > 0 ? currentCharacterElement.value.previousElementSibling.getBoundingClientRect().bottom : 0
                const nextSiblingTopOffset = props.index > 0 && currentCharacterElement.value.nextElementSibling ? currentCharacterElement.value.nextElementSibling.getBoundingClientRect().top : 0
                const nextSiblingBottomOffset = props.index > 0 && currentCharacterElement.value.nextElementSibling ? currentCharacterElement.value.nextElementSibling.getBoundingClientRect().bottom : 0
                
                if (nextSiblingBottomOffset > cursorBottomOffset) enterKey.value = true
                else enterKey.value = false         
                
                if (!(parentBottomOffset - prevSiblingBottomOffset <= lineHeight) && parentBottomOffset - cursorBottomOffset <= lineHeight && scrollDistance.value < parentScrollHeight) {
                    if (!backspaceIsPressed.value) {     
                        if (testContainerEl.value.scrollTop + parentHeight === parentScrollHeight) return
                        else {
                            if (parentScrollHeight - testContainerEl.value.scrollTop > parentHeight) scrollDistance.value += containerHeight.value - font.value - (font.value * 0.4)
                            else scrollDistance.value += parentScrollHeight - testContainerEl.value.scrollTop
                            scrollTextContainer.value = {
                                top: scrollDistance.value
                            }
                        }
                    }
                }

                if (cursorTopOffset < parentTopOffset && props.index > 0 && nextSiblingTopOffset !== cursorTopOffset) {   

                    if (backspaceIsPressed.value) {
                        if (testContainerEl.value.scrollTop <= parentHeight) scrollDistance.value = 0
                        else scrollDistance.value -= ((containerHeight.value / 3) * 2)
                        scrollTextContainer.value = {
                            top: scrollDistance.value
                        }
                    }
                }
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
        'text-green-400': !blind.value && equality.value && theme.value === 'dark'&& !blind.value,
        'text-green-500': !blind.value && equality.value && theme.value === 'white' && !blind.value,
        
        // INCORRECT CHARS
        'text-red-500': !blind.value && !currentIndex.value && !equality.value && theme.value === 'dark',
        'text-red-600': !blind.value && !currentIndex.value && !equality.value && theme.value === 'white',

        'opacity-100 animate-pulse' : (cursorType.value === 'pulse' || cursorType === 'word-pulse') && props.character === ' ',
    }
})

const cursorStyle = computed(() => {
    return {
        'border-blue-700 border-[1px]': focus.value && cursorType.value === 'border',
        'border-blue-700 border-l-[2px]': focus.value && cursorType.value === 'cursor',
        'border-blue-700 border-b-[2px]': focus.value && cursorType.value === 'underline'
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
        'word-pulse border-transparent' :
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



















