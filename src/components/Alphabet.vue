<template>
    <div aria-hidden="true" ref="currentAlphabet" :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap']" class="relative inline">
        <span  :class="[!focus && currentIndexStyle ? 'text-slate-500' : '', equalStyle, (isMobileOS() && focus) || !isMobileOS() ? currentIndexStyle : '', mainStyle, !currentIndex || isMobileOS() && !focus ? 'border-transparent' : '', pulseStyle, blurStyle, (caretType === 'pulse' || caretType === 'word-pulse') && alphabet === ' ' ? 'opacity-20' : '']" class="transition-opacity duration-75 border" >{{ alphabet }} </span>
    </div>
</template> 

<script setup>
import { defineProps, computed, watchEffect, ref, onMounted, watch } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {customizeStore}  from '../store/customizeStore'
import { isMobileOS } from '../composables/isMobileOS';

const theme_ = themeStore()
const {theme } = storeToRefs(theme_)

const store = mainStore()
const { playerInputLength, focus, testContainerEl, isGeneratingTest, allSpacesIndex, spaceCount, scrollTextContainer, enterKey, scrollDistance, backspaceIsPressed, containerHeight } = storeToRefs(store)
const currentAlphabet = ref(null)

const customize = customizeStore()
const {customizers, caretType, font, blind} = storeToRefs(customize)

const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
    lastIndex: Boolean
})

window.addEventListener('input', event => {
    if (event.inputType === 'deleteContentBackward' && props.currentIndex) {
        backspaceIsPressed.value = true
    } else if (event.inputType !== 'deleteContentBackward' && props.currentIndex)  {
        backspaceIsPressed.value = false
    }
})

onMounted(() => {
    if (props.lastIndex) isGeneratingTest.value = false

    watchEffect(() => {
        if (props.currentIndex) {
            
            if (!backspaceIsPressed.value && props.alphabet === ' ')  {
                spaceCount.value = allSpacesIndex.value.indexOf(props.index) + 1
            }
            
            if (backspaceIsPressed.value && props.alphabet === ' ')  {
                spaceCount.value = allSpacesIndex.value.indexOf(props.index) + 1
            }

            if (currentAlphabet.value) {     
                const parentScrollHeight = testContainerEl.value.scrollHeight
                const parentHeight = testContainerEl.value.getBoundingClientRect().height
                const caretTopOffset = currentAlphabet.value.getBoundingClientRect().top
                const parentTopOffset = testContainerEl.value.getBoundingClientRect().top
                const caretBottomOffset = currentAlphabet.value.getBoundingClientRect().bottom
                const parentBottomOffset = testContainerEl.value.getBoundingClientRect().bottom
                const lineHeight = currentAlphabet.value.getBoundingClientRect().bottom - currentAlphabet.value.getBoundingClientRect().top
                const prevSiblingBottomOffset = props.index > 0 ? currentAlphabet.value.previousElementSibling.getBoundingClientRect().bottom : 0
                const nextSiblingTopOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().top : 0
                const nextSiblingBottomOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().bottom : 0
                
                if (nextSiblingBottomOffset > caretBottomOffset) enterKey.value = true
                else enterKey.value = false         
                
                if (!(parentBottomOffset - prevSiblingBottomOffset <= lineHeight) && parentBottomOffset - caretBottomOffset <= lineHeight && scrollDistance.value < parentScrollHeight) {
                    if (!backspaceIsPressed.value) {     
                        if (testContainerEl.value.scrollTop + parentHeight === parentScrollHeight) return
                        else {
                            if (parentScrollHeight - testContainerEl.value.scrollTop > parentHeight) {          
                                scrollDistance.value += containerHeight.value - font.value - (font.value * 0.4)
                            } else {
                                scrollDistance.value += parentScrollHeight - testContainerEl.value.scrollTop
                            }
                            scrollTextContainer.value = {
                                top: scrollDistance.value
                            }
                        }
                    }
                }

                if (caretTopOffset < parentTopOffset && props.index > 0 && nextSiblingTopOffset !== caretTopOffset) {   
                    if (backspaceIsPressed.value) {
                        if (testContainerEl.value.scrollTop <= parentHeight) {
                            scrollDistance.value = 0
                        } else {
                            scrollDistance.value -= ((containerHeight.value / 3) * 2)
                        }
                            scrollTextContainer.value = {
                            top: scrollDistance.value
                        }
                    }
                }
            }
        }
    })
})

const equalStyle = computed(() => {
    if (!blind.value) {
        let correctText = theme.value === 'dark' ? 'text-green-300' : 'text-green-500'
        let wrongText = theme.value === 'dark' ? 'text-red-500' : theme.value !== 'dark' && props.index < playerInputLength.value  ? 'text-red-600' : ''
        return props.equality ? correctText : wrongText
    }
})

const currentIndexStyle = computed(() => {
    let text = theme.value === 'dark' ? 'text-neutral-400' : 'bg-transparent text-zinc-500' 
    let caret = caretType.value === 'border' ? 'border border-slate-500' : caretType.value === 'caret' ? 'border-transparent border-l-zinc-600' : caretType.value === 'underline' ? 'border-transparent border-b-blue-600' : caretType.value === 'pulse' && props.alphabet !== ' ' ? 'pulse border-transparent' : ''
    return  props.currentIndex ? text + ' ' + caret : ''
})

const mainStyle = computed(() => {
    let text = theme.value === 'dark' ? 'text-slate-500' : 'text-zinc-500'
    return props.index > playerInputLength.value ? text : ''
})

const blurStyle = computed(() => {
    if (customizers.value['blur']) {        
        return allSpacesIndex.value[spaceCount.value + 1] && props.index > allSpacesIndex.value[spaceCount.value + 1] ? 'blur-[7px]' : props.index > allSpacesIndex.value[spaceCount.value] ? 'blur-[1px]' : ''
    }
})

const pulseStyle = computed(() => {
    if (caretType.value === 'word-pulse') {        
        return (spaceCount.value === 0 && props.index < allSpacesIndex.value[0]) || (allSpacesIndex.value[spaceCount.value - 1] && props.index > allSpacesIndex.value[spaceCount.value -1] && props.index < allSpacesIndex.value[spaceCount.value]) || (props.index > allSpacesIndex.value[allSpacesIndex.value.length - 1] && spaceCount.value === allSpacesIndex.value.length) ? 'word-pulse border-transparent' : ''
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
        opacity: 20%;
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
        opacity: 15%;
    }
    100% {
        opacity: 70%;
    }
}

</style>