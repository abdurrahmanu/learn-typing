<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="w-fit h-fit">
            <div class="flex text-[10px] font-medium cursor-pointer">
                <p @click="toggleMode('test')" class="px-3 py-1 border rounded-l-lg" :class="[mode === 'auto' ? 'border-green-600 text-green-600' : 'border-slate-500 border-r-0']">WORDS</p>
                <p @click="toggleMode('alphabets')" class="px-3 py-1 border rounded-r-lg" :class="[mode === 'alphabets' ? 'border-green-600 text-green-600' : 'border-slate-500 border-l-0']">ALPHABETS</p>
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
const { customizers, hideElements, mode, repeat} = storeToRefs(customize)

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
    switchNext(customizers.value )
}
</script>
