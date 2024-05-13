<template>
    <div :ref="currentIndex ? 'currentAlphabet' : ''" :class="[customizers['no-space'] ? '' : 'whitespace-pre-wrap']" class="relative inline font-mono">
        <Transition v-if="currentIndex" appear>            
            <span :class="[mainStyle, equalStyle, currentIndexStyle, styledAlphas]" class="transition-all">{{ alphabet }}</span>
        </Transition>
        <span v-else :class="[equalStyle, currentIndexStyle, mainStyle, styledAlphas]">{{ alphabet }} </span>
    </div>
</template> 

<script setup>
import { defineProps, computed, watchEffect, ref } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore';

const store = mainStore()
const { playerInputLength, alphabets, alphabetsMode, theme, scrollTextContainer, scrollDistance, backspaceIsPressed, containerText} = storeToRefs(store)

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

watchEffect(() => {
    if (props.currentIndex) {
        //Auto scroll- check if caret is within container viewport, if not - scroll in
        if (currentAlphabet.value instanceof HTMLElement) {
            const parentScrollHeight = currentAlphabet.value.parentElement.scrollHeight
            const parentHeight = currentAlphabet.value.parentElement.getBoundingClientRect().height
            const caretTopOffset = currentAlphabet.value.getBoundingClientRect().top
            const parentTopOffset = currentAlphabet.value.parentElement.getBoundingClientRect().top
            const caretBottomOffset = currentAlphabet.value.getBoundingClientRect().bottom
            const parentBottomOffset = currentAlphabet.value.parentElement.getBoundingClientRect().bottom
            const lineHeight = currentAlphabet.value.getBoundingClientRect().bottom - currentAlphabet.value.getBoundingClientRect().top
            const prevSiblingBottomOffset = props.index > 0 ? currentAlphabet.value.previousElementSibling.getBoundingClientRect().bottom : 0
            const nextSiblingTopOffset = props.index > 0 && currentAlphabet.value.nextElementSibling ? currentAlphabet.value.nextElementSibling.getBoundingClientRect().top : 0
            
            if (currentAlphabet.value.getBoundingClientRect().top < parentTopOffset) {
                currentAlphabet.value.parentElement.scrollTo({
                    top: -parentTopOffset
                })
            }

            if (currentAlphabet.value.getBoundingClientRect().bottom > parentBottomOffset) {
                currentAlphabet.value.parentElement.scrollTo({
                    top: parentBottomOffset
                })
            }

            if (!(parentBottomOffset - prevSiblingBottomOffset <= lineHeight) && parentBottomOffset - caretBottomOffset <= lineHeight && scrollDistance.value < parentScrollHeight) {
                if (!backspaceIsPressed.value) {                    
                    if (currentAlphabet.value.parentElement.scrollTop + parentHeight === parentScrollHeight) return
                    else {
                        if (parentScrollHeight - currentAlphabet.value.parentElement.scrollTop > parentHeight) {                    
                            scrollDistance.value += (parentHeight - lineHeight) - (parentBottomOffset - caretBottomOffset)
                        } else {
                            scrollDistance.value += parentScrollHeight - currentAlphabet.value.parentElement.scrollTop
                        }
                        scrollTextContainer.value = {
                            top: scrollDistance.value
                        }
                    }
                }
            }

            if (caretTopOffset < parentTopOffset && props.index > 0 && nextSiblingTopOffset !== caretTopOffset) {    
                if (backspaceIsPressed.value) {
                    if (currentAlphabet.value.parentElement.scrollTop < parentHeight) {
                        scrollDistance.value -= currentAlphabet.value.parentElement.scrollTop
                    } else {      
                        scrollDistance.value -=  parentHeight
                    }
                        scrollTextContainer.value = {
                        top: scrollDistance.value
                    }
                }
            }
        }
    }
})

const equalStyle = computed(() => {
    if (!customizers.value['blind-mode']) {
        let correctText = theme.value === 'neutral' ? 'text-green-300' : 'text-green-500'
        let wrongText = theme.value === 'neutral' ? 'text-red-500' : theme.value !== 'neutral' && props.index < playerInputLength.value  ? 'text-red-600' : ''
        return props.equality ? correctText : wrongText
    }
})

const styledAlphas = computed(() => {
    if (alphabets.value && alphabetsMode.value.styled) {
        let style = theme.value === 'neutral' ? ' bg-zinc-900 border-slate-400' : ' bg-slate-100 border-neutral-800 '
        return 'border rounded-md p-1 mx-[2px] ' + style
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
</script>

<style scoped>
.v-enter-active, .v-leave-active {
    transition: all 1s ease-in-out;
}
</style>
