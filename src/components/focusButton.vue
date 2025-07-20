<template>
    <p id="focus" v-if="shouldFocus">Click test or press any key to focus</p>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { typingStateStore } from '../store/typingStateStore';
import { computed } from 'vue';

const typingstatestore = typingStateStore()
const {refocus, focus} = storeToRefs(typingstatestore)

const shouldFocus = computed(() => {
    return (isTouchScreenDevice() && !focus.value) || refocus.value
})
</script>