<template>
    <div class="py-6 pt-4 m-auto w-fit h-fit">
            <Pagination 
            @page="currentPage = $event" 
            :pages-array="pages" />
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import Pagination from './Settings/Pagination.vue';
import {englishWords} from '../../data/englishWords.js'
import {fetchWord} from '../composables/UseDictionary.js'

const pages = ['TEST MODE', 'ALPHABETS MODE', 'DICTIONARY MODE', 'GAME MODE']
const modes = ['test', 'alphabets', 'dictionary', 'game']

const store = mainStore()
const { alphabets, movie, authoredQuote, currentPage, containerText, dictionaryMode, dictionaryData, searchWord, gameMode} = storeToRefs(store)
const {resetToDefault, generateText} = store

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const toggleMode = (mode) => {
    if (mode === 'alphabets') {
        dictionaryMode.value = false
        alphabets.value = true
        movie.value = {}
        authoredQuote.value = {}
        localStorage.setItem('dorayi-typing-mode', 'alphabets')
    } 
    else if (mode === 'dictionary') {
        containerText.value = ''
        if (!dictionaryMode.value) {
            const {mostUsed} = englishWords()
            const random = Math.ceil(Math.random() *  mostUsed.length) - 1
            searchWord.value = mostUsed[random]
            async function fetchWordDefinitions(word) {
                if (word) {
                    await fetchWord(word).then((data) => {            
                        dictionaryData.value = data.data.value
                        localStorage.setItem('dorayi-typing-mode', 'dictionary')
                        resetToDefault()
                        generateText(customizers.value)
                    })
                }
            }
            fetchWordDefinitions(searchWord.value)    
        }
        dictionaryMode.value = true
        alphabets.value = false    
        gameMode.value = false
    } 
    else if (mode === 'game') {
        alphabets.value = false    
        dictionaryMode.value = false
        gameMode.value = true
        localStorage.setItem('dorayi-typing-mode', 'game')
    } 
    else {
        dictionaryMode.value = false
        alphabets.value = false
        gameMode.value = false
        localStorage.setItem('dorayi-typing-mode', 'test')
    } 

    if (mode !== 'game') {
        resetToDefault()
        generateText(customizers.value)
    }
}

watch(currentPage, (newVal, oldVal) => {
    toggleMode(modes[newVal])
})
</script>
