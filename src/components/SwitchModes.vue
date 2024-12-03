<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="w-fit h-fit">
            <div class="flex text-[10px] font-medium cursor-pointer">
                <p @click="toggleMode('auto')" class="px-5 py-1 border rounded-l-lg md:px-10 hover:border-green-500" :class="[mode === 'auto' ? 'border-green-600 bg-green-700 text-white' : 'border-slate-500 border-r-0 hover:text-green-500']">WORDS</p>
                <p @click="toggleMode('alphabets')" class="px-5 py-1 border rounded-r-lg md:px-10 hover:border-green-500" :class="[mode === 'alphabets' ? 'border-green-600 bg-green-500 text-white' : 'border-slate-500 hover:text-green-500 border-l-0']">ALPHABETS</p>
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
import {updateDB} from '../composables/updateDB'


const route = useRoute()

const alphabets_ = alphabetsStore()
const { alphabetsMode_ } = storeToRefs(alphabets_)

const count = countdownStore()
const {clearCounter} = count

const store = mainStore()
const { movie, authoredQuote, hasCompletedSession, timedTyping} = storeToRefs(store)

const customize = customizeStore()
const { mode, repeat, switchMode} = storeToRefs(customize)


const toggleMode = (type) => {
    if (mode.value === type) return
    
    switchMode.value = true
    repeat.value = false
    if (timedTyping.value) clearCounter()
    
    if (type === 'alphabets') {
        mode.value = 'alphabets'
        alphabetsMode_.value = true
        movie.value = {}
        authoredQuote.value = {}
    }
    else if (type === 'auto') {
        mode.value = 'auto'
        alphabetsMode_.value = false
    }
    
    updateDB(Object.keys({mode})[0], mode.value, null, true)
}
</script>
