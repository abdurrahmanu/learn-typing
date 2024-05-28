<template>
    <div ref="currentAlphabet" :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap']" class="relative inline ">
        <span  :class="[equalStyle, currentIndexStyle, mainStyle]">{{ alphabet }} </span>
    </div>
</template> 

<script setup>
import { defineProps, computed, watchEffect, ref, onMounted, watch } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore';

const store = mainStore()
const { playerInputLength, theme, containerRef, scrollTextContainer, scrollDistance, backspaceIsPressed, font, containerHeight } = storeToRefs(store)
const currentAlphabet = ref(null)
const customize = customizeStore()
const {customizers} = storeToRefs(customize)
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


                    // if (caretTopOffset < parentTopOffset && props.index > 0 && nextSiblingTopOffset !== caretTopOffset) {    
                    //     if (backspaceIsPressed.value) {
                    //         if (containerRef.value.scrollTop >= parentHeight) {
                    //             scrollDistance.value -= containerHeight.value
                    //         } else {
                    //             scrollDistance.value -= (parentScrollHeight - containerRef.value.scrollTop)
                    //         }
                    //             scrollTextContainer.value = {
                    //             top: scrollDistance.value
                    //         }
                    //     }
                    // }
            }
        }
    })
})

const equalStyle = computed(() => {
    if (!customizers.value['blind-mode']) {
        let correctText = theme.value === 'neutral' ? 'text-green-300' : 'text-green-500'
        let wrongText = theme.value === 'neutral' ? 'text-red-500' : theme.value !== 'neutral' && props.index < playerInputLength.value  ? 'text-red-600' : ''
        return props.equality ? correctText : wrongText
    }
})

const currentIndexStyle = computed(() => {
    let text = theme.value === 'neutral' ? ' border border-zinc-700 text-white' : ' bg-transparent border border-black text-neutral-900' 
    return  props.currentIndex ? text : ''
})

const mainStyle = computed(() => {
    let text = theme.value === 'neutral' ? 'text-slate-400' : 'text-neutral-500'
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

<style scoped>
.v-enter-active, .v-leave-active {
    transition: all 1s ease-in-out;
}
</style>
