<template>
    <div class="m-auto my-6 w-fit h-fit">
            <Pagination 
            @page="currentPage = $event" 
            :all-pages="pages" />
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import Pagination from './Settings/Pagination.vue';

const pages = ['TEST MODE', 'ALPHABETS MODE', 'DICTIONARY MODE', 'GAME MODE']
const modes = ['test', 'alphabets', 'dictionary', 'game']

const store = mainStore()
const { alphabets, movie, authoredQuote, currentPage} = storeToRefs(store)
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

watch(currentPage, (newVal, oldVal) => {
    toggleMode(modes[newVal])
})
</script>
