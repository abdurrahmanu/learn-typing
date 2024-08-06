<template>
    <div aria-hidden="true" ref="currentAlphabet" :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap', testBackgroundComputed ]" class="relative inline">
        <span  :class="[equalStyle, currentIndexStyle, mainStyle, !currentIndex ? 'border-transparent' : '', pulseStyle], blurStyle" class="border" >{{ alphabet }} </span>
    </div>
</template> 

<script setup>
import { defineProps, computed, watchEffect, ref, onMounted } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {customizeStore}  from '../store/customizeStore'

const theme_ = themeStore()
const {theme, testBackgroundComputed } = storeToRefs(theme_)

const store = mainStore()
const { playerInputLength, testContainerEl, allSpacesIndex, spaceCount, scrollTextContainer, enterKey, scrollDistance, backspaceIsPressed, containerHeight } = storeToRefs(store)
const currentAlphabet = ref(null)

const customize = customizeStore()
const {customizers, caretType, font, blind} = storeToRefs(customize)

const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
})

window.addEventListener('input', event => {
    if (event.inputType === 'deleteContentBackward' && props.currentIndex) {
        backspaceIsPressed.value = true
    } else if (event.inputType !== 'deleteContentBackward' && props.currentIndex)  {
        backspaceIsPressed.value = false
    }
})

onMounted(() => {
    watchEffect(() => {
        if (props.currentIndex) {
            if (!backspaceIsPressed.value && props.currentIndex && props.alphabet === ' ') spaceCount.value = allSpacesIndex.value.indexOf(props.index)
            if (backspaceIsPressed.value && props.currentIndex && props.alphabet === ' ') spaceCount.value = allSpacesIndex.value.indexOf(props.index)

            console.log(spaceCount.value);
            
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
                

                console.log(spaceCount.value);

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
    let text = theme.value === 'dark' ? 'text-slate-400' : 'bg-transparent text-neutral-900' 
    let caret = caretType.value === 'border' ? 'border border-zinc-500' : caretType.value === 'caret' ? 'border-transparent border-l-zinc-600' : caretType.value === 'underline' ? 'border-transparent border-b-blue-600' : ''
    return  props.currentIndex ? text + ' ' + caret : ''
})

const mainStyle = computed(() => {
    let text = theme.value === 'dark' ? 'text-slate-400' : 'text-zinc-500'
    return props.index > playerInputLength.value ? text : ''
})

const blurStyle = computed(() => {
    return [customizers.value['blur'] &&  props.index < allSpacesIndex.value[spaceCount.value + 1] && props.index > allSpacesIndex.value[spaceCount.value + 1] ? 'blur-[2px]' : '', customizers.value['blur'] && props.index > allSpacesIndex.value[spaceCount.value + 1] ? 'blur-[7px]' : '']
})

const pulseStyle = computed(() => {
    return customizers.value['pulse'] && ((props.index < allSpacesIndex.value[spaceCount.value] && props.index > allSpacesIndex.value[spaceCount.value]) || (spaceCount.value === 0 && props.index <= allSpacesIndex.value[0]) ) ? 'pulse' : ''
})
</script>

<!-- ||(props.index >= allSpacesIndex.value[allSpacesIndex.value.length - 1]  -->


<style scoped>
.pulse {
    transition: all 2s ease;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 60%
    }
    50% {
        opacity: 10%;
    }
    100% {
        opacity: 60%;
    }
}

</style>