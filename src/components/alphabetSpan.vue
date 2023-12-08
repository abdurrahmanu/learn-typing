<template>
    <div 
    class="main-style" 
    :class="[ currentIndex ? 'text-white' : '',
    equal && !(alphabet === ' ') ? 'text-green-500' : 'text-slate-400',
    unequal && !(alphabet === ' ') ? 'text-red-500' : 'text-slate-400']">

        <Transition name="focus">
            <span v-if="currentIndex" class="focus animateFocus"></span>
        </Transition>

        <span>{{ alphabet }}</span>

    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from 'vue';

const emit = defineEmits(['equal', 'unequal'])
const equal = ref(false)
const unequal = ref(false)
const props = defineProps({
    alphabet: String,
    equal: Boolean,
    unequal: Boolean,
    index: Number,
    clearAlphabet: Boolean,
    currentIndex: Boolean,
})

watchEffect(() => {
    if (props.equal) {
        equal.value = true
        emit('equal')
    }

    if (props.unequal) {
        unequal.value = true
        emit('unequal')
    }

    if (props.clearAlphabet) {
        equal.value = false,
        unequal.value = false
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