<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="absolute m-auto w-fit h-fit bottom-[13px] right-16">
            <div class="flex font-mono text-xs">
                <p @click="toggleMode('test')" class="px-3 border-2 border-r-0" :class="[mode === 'auto' ? 'border-green-500' : 'border-slate-500']">TEST MODE</p>
                <p @click="toggleMode('alphabets')" class="px-3 border-2" :class="[mode === 'alphabets' ? 'border-green-500' : 'border-slate-500']">ALPHABET MODE</p>
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
