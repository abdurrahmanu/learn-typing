<template>
    <div aria-hidden="true" ref="currentAlphabet" :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap']" class="relative inline ">
        <span  :class="[equalStyle, currentIndexStyle, mainStyle, !currentIndex ? 'border-transparent' : '']" class="border" >{{ alphabet }} </span>
    </div>
</template> 

<script setup>
import { defineProps, computed, watchEffect, ref, onMounted, watch } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {customizeStore}  from '../store/customizeStore'

const theme_ = themeStore()
const {theme } = storeToRefs(theme_)

const store = mainStore()
const { playerInputLength, containerRef, scrollTextContainer, enterKey, scrollDistance, backspaceIsPressed, containerHeight } = storeToRefs(store)
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
            if (currentAlphabet.value) {       
                    const parentScrollHeight = containerRef.value.scrollHeight
                    const parentHeight = containerRef.value.getBoundingClientRect().height
                    const caretTopOffset = currentAlphabet.value.getBoundingClientRect().top
                    const parentTopOffset = containerRef.value.getBoundingClientRect().top
                    const caretBottomOffset = currentAlphabet.value.getBoundingClientRect().bottom
                    const parentBottomOffset = containerRef.value.getBoundingClientRect().bottom
                    const lineHeight = currentAlphabet.value.getBoundingClientRect().bottom - currentAlphabet.value.getBoundingClientRect().top
                    const prevSiblingBottomOffset = props.index > 0 ? currentAlphabet.value.previousElementSibling.getBoundingClientRect().bottom : 0
                    const nextSiblingTopOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().top : 0
                    const nextSiblingBottomOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().bottom : 0

                    if (nextSiblingBottomOffset > caretBottomOffset) enterKey.value = true
                    else enterKey.value = false


                    if ((!(parentBottomOffset - prevSiblingBottomOffset <= lineHeight) && parentBottomOffset - caretBottomOffset <= lineHeight && scrollDistance.value < parentScrollHeight)) {
                        if (!backspaceIsPressed.value) {     
                            if (containerRef.value.scrollTop + parentHeight === parentScrollHeight) return
                            else {
                                if (parentScrollHeight - containerRef.value.scrollTop > parentHeight) {          
                                    scrollDistance.value += containerHeight.value - font.value - (font.value * 0.4)
                                } else {
                                    scrollDistance.value += parentScrollHeight - containerRef.value.scrollTop
                                }
                                scrollTextContainer.value = {
                                    top: scrollDistance.value
                                }
                            }
                        }
                    }

                    if (caretTopOffset < parentTopOffset && props.index > 0 && nextSiblingTopOffset !== caretTopOffset) {    
                        if (backspaceIsPressed.value) {
                            if (containerRef.value.scrollTop <= parentHeight) {
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

// watch(font, (newVal) => {
//     if (props.currentIndex) {
//         const caretBottomOffset = currentAlphabet.value.getBoundingClientRect().bottom
//         const parentBottomOffset = containerRef.value.getBoundingClientRect().bottom

//         scrollTextContainer.value = {
//             top: containerRef.value.scrollTop - (parentBottomOffset - caretBottomOffset) + +font.value + (+font.value * 0.4)
//         }
//     }
// })

            // if (currentAlphabet.value.getBoundingClientRect().top < parentTopOffset) {
            //     containerRef.value.scrollTo({
            //         top: -parentTopOffset
            //     })
            // }

            // if (currentAlphabet.value.getBoundingClientRect().bottom > parentBottomOffset) {
            //     containerRef.value.scrollTo({
            //         top: parentBottomOffset
            //     })
            // } 
</script>