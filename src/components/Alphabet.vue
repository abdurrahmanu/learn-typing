<template>
    <div aria-hidden="true" ref="currentAlphabet"  class="relative inline">
        <div v-if="currentIndex" class="inline-block h-[calc(100%_-_5px)] absolute left-0 bottom-0 right-0" :class="[cursorStyle, currentIndex && !backspaceIsPressed ? 'smooth-cursor-forward' : 'smooth-cursor-backward']"></div>
        <div :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap']" class="relative inline">
            <span  :class="[!focus && currentIndexStyle ? 'text-slate-500' : '', equalStyle, (isTouchScreenDevice() && focus) || !isTouchScreenDevice() ? currentIndexStyle : '', mainStyle, !currentIndex || isTouchScreenDevice() && !focus ? 'border-transparent' : '', pulseStyle, blurStyle, (cursorType === 'pulse' || cursorType === 'word-pulse') && alphabet === ' ' ? 'opacity-100 animate-pulse' : '']" class="relative transition-opacity duration-75" >{{ alphabet }}</span>
        </div>
    </div>
</template> 

<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import { customizeStore }  from '../store/customizeStore'
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';

//playerInputLength === props.index - 1
//props.alphabet's index === containerText.value[props.index - 1]

const theme_ = themeStore()
const { theme } = storeToRefs(theme_)

const store = mainStore()
const { playerInputLength, containerText, focus, spaces, testContainerEl, allSpacesIndex, scrollTextContainer, enterKey, scrollDistance, backspaceIsPressed, containerHeight } = storeToRefs(store)
const currentAlphabet = ref(null)

const customize = customizeStore()
const { customizers, cursorType, font, blind } = storeToRefs(customize)

const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
    lastIndex: Boolean
})

window.addEventListener('input', event => {
    if (event.inputType === 'deleteContentBackward' && props.currentIndex)  backspaceIsPressed.value = true
    else if (event.inputType !== 'deleteContentBackward' && props.currentIndex) backspaceIsPressed.value = false
})

onMounted(() => {
    watch(() => props.currentIndex, newVal => {
        if (newVal) {      
            if (!backspaceIsPressed.value && containerText.value[props.index - 2] === ' ') spaces.value[props.index - 1] = ' '            
            if (backspaceIsPressed.value && containerText.value[props.index - 1] === ' ') spaces.value[props.index] ? delete spaces.value[props.index] : ''
            
            if (currentAlphabet.value) {     
                const parentScrollHeight = testContainerEl.value.scrollHeight
                const parentHeight = testContainerEl.value.getBoundingClientRect().height
                const cursorTopOffset = currentAlphabet.value.getBoundingClientRect().top
                const parentTopOffset = testContainerEl.value.getBoundingClientRect().top
                const cursorBottomOffset = currentAlphabet.value.getBoundingClientRect().bottom
                const parentBottomOffset = testContainerEl.value.getBoundingClientRect().bottom
                const lineHeight = currentAlphabet.value.getBoundingClientRect().bottom - currentAlphabet.value.getBoundingClientRect().top
                const prevSiblingBottomOffset = props.index > 0 ? currentAlphabet.value.previousElementSibling.getBoundingClientRect().bottom : 0
                const nextSiblingTopOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().top : 0
                const nextSiblingBottomOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().bottom : 0
                
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

const typedWhiteSpaces = computed(() => Object.keys(spaces.value).length)

const cursorStyle = computed(() => {
    let cursor = cursorType.value === 'border' ? 'border-[1px]' : cursorType.value === 'cursor' ? 'border-l-[2px]' : cursorType.value == 'underline' ? 'border-b-[2px]' : ''
    let bg = 'border-blue-700'
    return cursor + ' ' + bg
})

const currentIndexStyle = computed(() => {
    let text = theme.value === 'dark' ? 'text-slate-500' : 'bg-transparent text-zinc-500' 
    let cursor = cursorType.value === 'pulse' && props.alphabet !== ' ' ? 'pulse border-transparent' : ''
    return  props.currentIndex ? text + ' ' + cursor : ''
})

const equalStyle = computed(() => {
    if (!blind.value) {
        let correctText = theme.value === 'dark' ? 'text-green-300' : 'text-green-500'
        let wrongText = theme.value === 'dark' ? 'text-red-500' : theme.value !== 'dark' && props.index - 1 < playerInputLength.value  ? 'text-red-600' : ''
        return props.equality ? correctText : wrongText
    }
})

const mainStyle = computed(() => {
    let text = theme.value === 'dark' ? 'text-slate-500' : 'text-zinc-500'
    return props.index > playerInputLength.value ? text : ''
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



















