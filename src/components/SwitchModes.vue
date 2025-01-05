<template>
    <div v-if="!hasCompletedSession && route.name === 'home'" class="w-fit h-fit text-[12px]">
            <div class="flex font-medium cursor-pointer">
                <p @click="toggleMode('auto')" class="px-5 py-1 border rounded-l-lg md:px-10 hover:border-green-500" :class="[mode === 'auto' ? 'border-green-600 bg-green-700 text-slate-200' : 'border-slate-500 border-r-0 hover:text-green-500']">WORDS</p>
                <p @click="toggleMode('alphabets')" class="px-5 py-1 border rounded-r-lg md:px-10 hover:border-green-500" :class="[mode === 'alphabets' ? 'border-green-600 bg-green-500 text-slate-200' : 'border-slate-500 hover:text-green-500 border-l-0']">ALPHABETS</p>
            </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { countdownStore } from '../store/countdownStore';
import {useRoute} from 'vue-router'
import {updateDB} from '../composables/updateDB'

const route = useRoute()

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
        movie.value = {}
        authoredQuote.value = {}
    }
    
    else if (type === 'auto') mode.value = 'auto'
    
    updateDB(Object.keys({mode})[0], mode.value, null, true)
}
</script>