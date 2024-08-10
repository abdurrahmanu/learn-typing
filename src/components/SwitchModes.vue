<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="absolute m-auto w-fit h-fit bottom-[9px] right-16 text-[10px]">
            <div class="flex">
                <p @click="toggleMode('test')" class="px-3 py-1 font-[600] border rounded-l-lg" :class="[mode === 'auto' ? 'border-green-400 text-green-600' : 'border-slate-500 border-r-0']">TEST MODE</p>
                <p @click="toggleMode('alphabets')" class="px-3 py-1 font-bold border rounded-r-lg" :class="[mode === 'alphabets' ? 'border-green-400 text-green-600' : 'border-slate-500 border-l-0']">ALPHABET MODE</p>
            </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import {useRoute} from 'vue-router'

const route = useRoute()

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const store = mainStore()
const { movie, authoredQuote, hasCompletedSession} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers, hideElements, mode, repeat} = storeToRefs(customize)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const toggleMode = (type) => {
    repeat.value = false
    
    if (type === 'alphabets') {
        mode.value = 'alphabets'
        alphabetsMode_.value = true
        movie.value = {}
        authoredQuote.value = {}
    }
    else if (type === 'test') {
        mode.value = 'auto'
        alphabetsMode_.value = false
    }    
    
    localStorageSettings.value.mode = mode.value
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
    switchNext(customizers.value )
}
</script>
