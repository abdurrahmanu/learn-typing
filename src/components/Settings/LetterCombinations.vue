<template>
    <div class="p-3 px-1 border-t border-neutral-900 ">
        <div @click="toggle" class="flex w-full p-1 space-x-4 border border-transparent rounded-sm hover:border-neutral-300">
            <input :checked="useAlphabetCombination"  type="checkbox" name="letter-combination" id="id">
            <p for="id">Letter Combinations</p>
        </div>
        <div class="px-4">
            <p>This test randomly repeats alphabets you select, Maximum selection of five alphabets</p>
        </div>
        <div class="flex flex-wrap items-center justify-center px-3 py-4 space-x-1 space-y-1">
            <span class="p-1 rounded-md border border-neutral-700 text-lg inline-block min-w-[20px] text-center hover:text-slate-500" @click="addSelection(alphabet)" :class="[alphabetsCombination.includes(alphabet) ? 'bg-neutral-400 text-black' : ''] " v-for="(alphabet, index) in alphabets" :key="index">{{ alphabet }}</span>
        </div>
        <div class="text-xl font-mono px-2 text-center min-h-[16px]">{{ alphabetsCombination.join('') }}</div>
        <div class="py-1 text-center">
            <button @click="useCombination()" class="px-4 py-1 bg-green-700 rounded-full hover:bg-green-500 text-slate-200 ">USE THIS LETTER COMBINATION</button>
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore'
import { customizeStore } from '../../store/customizeStore';
import {alphabetsStore}  from '../../store/alphabetsModeStore';

const alphabets_ = alphabetsStore()
const { alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const store = mainStore()
const {switchNext} = store

const customize = customizeStore()
const {customizers} = storeToRefs(customize)

const toggle = () => {
    useAlphabetCombination.value = !useAlphabetCombination.value
    if (useAlphabetCombination.value) {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'true')
    } else {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'false')
    }
    if (alphabetsCombination.value.length > 1) {
        switchNext(customizers.value  )
    }
}

const addSelection = (alphabet) => {
    let index = alphabetsCombination.value.indexOf(alphabet)
    if (index > -1) {
        alphabetsCombination.value.splice(index, 1)
        return
    }
    if (alphabetsCombination.value.length === 5) return
    alphabetsCombination.value.push(alphabet)
}

const useCombination = () => {
    if (alphabetsCombination.value.length < 2) return 
    else {
        if (useAlphabetCombination.value) {
            localStorage.setItem('dorayi-typing-alphabet-combination', JSON.stringify(alphabetsCombination.value))
            switchNext(customizers.value )
        }
    }
}
</script>




