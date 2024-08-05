<template>
    <div v-if="!hasCompletedSession && route.name === 'home' && !hideElements" class="py-6 m-auto w-fit h-fit">
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
import {useRoute} from 'vue-router'
import Repeat from './svg/repeat.vue';

const route = useRoute()

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const pages = ['TEST MODE', 'ALPHABETS MODE']
const modes = ['test', 'alphabets']

const store = mainStore()
const { movie, authoredQuote, hasCompletedSession} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers, hideElements, mode, repeat} = storeToRefs(customize)

const pages_ = pagesStore()
const {currentPage } = storeToRefs(pages_)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const toggleMode = (type) => {
    repeat.value = false
    if (type === 'alphabets') {
        mode.value = 'alphabets'
        alphabetsMode_.value = true
        movie.value = {}
        authoredQuote.value = {}
    }
    else {
        mode.value = 'auto'
        alphabetsMode_.value = false
    }        
    localStorageSettings.value.mode = mode.value
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    switchNext(customizers.value )
}

watch(currentPage, (newVal, oldVal) => toggleMode(modes[newVal]))
</script>
