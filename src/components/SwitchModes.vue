<template>
        <div class="m-auto my-6 w-fit h-fit">
        <p class="p-1 m-auto font-mono text-center border rounded-md md:text-xl border-opacity-80 hover:border-opacity-100 opacity-60 hover:opacity-100 w-fit hover:border-slate-700">
            <span @click="toggleMode('alphabets')" v-if="!alphabets">THE ENGLISH ALPHABETS</span>
            <span @click="toggleMode('test')" v-else>TYPING TESTS</span>
        </p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';

const store = mainStore()
const { alphabets, movie, authoredQuote} = storeToRefs(store)
const {resetToDefault, generateText} = store

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const toggleMode = (mode) => {
    alphabets.value = !alphabets.value
    if (mode === 'alphabets') {
        movie.value = {}
        authoredQuote.value = {}
        localStorage.setItem('dorayi-typing-mode', 'alphabets')
    } else {
        localStorage.setItem('dorayi-typing-mode', 'test')
    }

    resetToDefault()
    generateText(customizers.value)
}
</script>

<style scoped>

</style>