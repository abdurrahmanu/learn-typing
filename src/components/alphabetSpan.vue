<template>
    <div 
    class="main-style" 
    :class=" {'text-white' : currentIndex, 'text-slate-200' : alphabet === ' ', 'text-slate-400' : !(alphabet === ' '), 'text-red-500' : unequal && !(alphabet === ' '), }">
        <Transition name="focus">
            <span v-if="currentIndex" class="focus animateFocus"></span>
        </Transition>

        <span>{{ alphabet }}</span>
    </div>
</template>

<script setup>
import { defineProps, watchEffect, computed } from 'vue';
import {storeToRefs} from 'pinia'
import {typingStore} from '../store/typingStore'

const store = typingStore()
const { correctCount, wrongCount, playerLastInput , playerInputLength, sessionCompleted, restartTyping} = storeToRefs(store)

const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean
})

watchEffect(() => {
    if (props.currentIndex) console.log(props.alphabet)
})

const equal = computed(() => {
    return playerLastInput.value === props.alphabet && playerInputLength.value - 1 === props.index && playerLastInput.length > 0
})

const unequal = computed(() => {
    return playerLastInput.value !== props.alphabet && playerInputLength.value - 1 === props.index && playerLastInput.value.length > 0
})

watchEffect(() => {
    if (equal.value) {
        correctCount.value++
    }

    if (unequal.value) {
        wrongCount.value++
    }

    if (restartTyping.value) {

    }
})
</script>

<style scoped>
.focus {
    @apply w-full py-3 rounded-md absolute inline-block top-[50%] opacity-20 translate-y-[-50%] bg-zinc-500 transition-all ease-in-out
}

.main-style {
    @apply relative hover:text-white font-mono inline w-fit whitespace-pre-wrap
}

.focus-enter-from {
    left: -100%;
}

.focus-enter-active, .focus-leave-active {
    transition: all 200ms ease;
}

.focus-leave-to {
    right: -100%
}


</style>