<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="w-fit h-fit">
            <div class="flex text-[10px] font-medium cursor-pointer">
                <p @click="toggleMode('test')" class="px-5 md:px-10 py-1 border rounded-l-lg hover:border-green-500" :class="[mode === 'auto' ? 'border-green-600 bg-green-700 text-white' : 'border-slate-500 border-r-0 hover:text-green-500']">WORDS</p>
                <p @click="toggleMode('alphabets')" class="px-5 md:px-10 py-1 border rounded-r-lg hover:border-green-500" :class="[mode === 'alphabets' ? 'border-green-600 bg-green-500 text-white' : 'border-slate-500 hover:text-green-500 border-l-0']">ALPHABETS</p>
            </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { countdownStore } from '../store/countdownStore';
import {useRoute} from 'vue-router'

const route = useRoute()

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const count = countdownStore()
const {clearCounter} = count

const store = mainStore()
const { movie, authoredQuote, hasCompletedSession, timedTyping} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers, mode, repeat} = storeToRefs(customize)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const toggleMode = (type) => {
    repeat.value = false
    if (timedTyping.value) clearCounter()
    
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
    switchNext(customizers.value)
}
</script>
