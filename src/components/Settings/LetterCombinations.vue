<template>
    <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5 pb-10">
        <div @click="toggle" class="flex w-full p-1 space-x-4 border border-transparent rounded-sm">
            <input :disabled="!(alphabetsCombination.length > 1)" :checked="useAlphabetCombination"  type="checkbox" name="letter-combination" id="id">
            <p for="id" class="font-medium w-fit">Letter Combinations</p>
        </div>
        <div class="px-4 pb-1">
            <p>**This test randomly repeats alphabets you select, Maximum selection of six entries and minimum of two</p>
        </div>
        <div class="text-xl font-mono px-2 text-center min-h-[30px]">{{ alphabetsCombination.join('') }}</div>
        <div class="flex flex-wrap items-center justify-center px-3 py-2 space-x-1">
            <span class="p-1 py-0 rounded-md border text-lg inline-block min-w-[20px] text-center hover:text-slate-500 m-1" @click="addSelection(alphabet)" :class="[alphabetsCombination.includes(alphabet) ? 'text-green-500 border-green-500' : 'border-neutral-800'] " v-for="(alphabet, index) in alphabets" :key="index">{{ alphabet }}</span>
        </div>
    </div>

</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore'
import { customizeStore } from '../../store/customizeStore';
import {alphabetsStore}  from '../../store/alphabetsModeStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const alphabets_ = alphabetsStore()
const { alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', ',', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '|', '|', '<', '>', '?', '/']
const store = mainStore()
const {switchNext} = store

const customize = customizeStore()
const {customizers} = storeToRefs(customize)

const toggle = () => {
    if (alphabetsCombination.value.length > 1) {
        useAlphabetCombination.value = !useAlphabetCombination.value
        switchNext(customizers.value)
    }

    if (useAlphabetCombination.value && alphabetsCombination.value.length > 1) {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'true')
        localStorage.setItem('dorayi-typing-alphabet-combination', JSON.stringify(alphabetsCombination.value))
    } else {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'false')
    }
}

const addSelection = (alphabet) => {
    let index = alphabetsCombination.value.indexOf(alphabet)
    if (index > -1) {
        alphabetsCombination.value.splice(index, 1)
        return
    }
    if (alphabetsCombination.value.length === 6) return
    alphabetsCombination.value.push(alphabet)
}

watch(alphabetsCombination, (newVal) => {
    if (newVal.length < 2) {
        useAlphabetCombination.value = false
        switchNext(customizers.value)
        return
    }
    
    if (useAlphabetCombination.value && newVal.length > 1) {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'true')
        localStorage.setItem('dorayi-typing-alphabet-combination', JSON.stringify(alphabetsCombination.value))
        switchNext(customizers.value)
    } else {
        localStorage.setItem('dorayi-typing-use-alphabets-combination', 'false')
    }
}, {deep: true})
</script>