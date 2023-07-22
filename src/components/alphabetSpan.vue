<template>
    <span class="text-slate-400 hover:text-white" :class="[equal && !(alphabet === ' ') ? 'text-green-900 opacity-40' : '', unequal && !(alphabet === ' ') ? 'text-red-900 opacity-40' : '', equal && alphabet === ' ' ? 'bg-green-900 opacity-40' : '', unequal && alphabet === ' ' ? 'bg-red-900 opacity-40' : '']">{{ alphabet }}</span>
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
    clearAlphabet: Boolean
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
