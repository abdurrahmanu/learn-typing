<template>
    <div class="py-6 pt-4 m-auto w-fit h-fit">
            <Pagination 
            @page="currentPage = $event" 
            :pages-array="pages" />
    </div>
</template>

<script setup>
import {watch, ref} from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import Pagination from './Settings/Pagination.vue';
import {pagesStore}  from '../store/pagesStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import {dictionaryStore}  from '../store/dictionaryModeStore';
import {test} from '../composables/test'

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const dictionary = dictionaryStore()
const { dictionaryMode_ } = storeToRefs(dictionary)

const pages = ['TEST MODE', 'ALPHABETS MODE', 'DICTIONARY MODE']
const modes = ['test', 'alphabets', 'dictionary']

const store = mainStore()
const { movie, authoredQuote, containerText, mode} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const pages_ = pagesStore()
const {currentPage } = storeToRefs(pages_)

const toggleMode = (type) => {
    if (type === 'alphabets') {
        mode.value = mode
        dictionaryMode_.value = false
        alphabetsMode_.value = true
        movie.value = {}
        authoredQuote.value = {}
        localStorage.setItem('dorayi-typing-mode', 'alphabets')
    } 
    else if (type === 'dictionary') {
        mode.value = mode
        containerText.value = ''
        alphabetsMode_.value = false    
        dictionaryMode_.value = true
        localStorage.setItem('dorayi-typing-mode', 'dictionary')
    } 
    else {
        mode.value = 'auto'
        dictionaryMode_.value = false
        alphabetsMode_.value = false
        localStorage.setItem('dorayi-typing-mode', 'test')
    }

    switchNext(customizers.value, null, test().res.value)
}

watch(currentPage, (newVal, oldVal) => {
    toggleMode(modes[newVal])
})
</script>
