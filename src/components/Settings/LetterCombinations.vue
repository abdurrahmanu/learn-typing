<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-1 pl-5">
        <div @click="toggle" class="flex w-full p-1 space-x-4 border border-transparent rounded-sm">
            <input :disabled="!(alphabetsCombination.length > 1)" :checked="useAlphabetCombination"  type="checkbox" name="letter-combination" id="id">
            <label for="id" class="font-medium w-fit">Letter Combinations <span class="px-3 text-white uppercase font-mono rounded-full py-[1px] text-[12px] bg-lime-600 ml-1">easy</span></label>
        </div>
        <div class="px-4">
            <p>**Randomly repeats and shuffles your selection. Select a minimum of two entries or maximum of ten entries then click the checkbox.</p>
            <div @click="shiftKey = !shiftKey" class="flex m-auto my-1 space-x-2 w-fit">
                <input :checked="shiftKey" type="checkbox" name="shiftkey" id="shiftkey">
                <label for="shiftkey" class="font-medium">Shift Key</label>
            </div>
        </div>

        <div class="relative m-auto h-fit w-fit">            
            <!-- <p class="absolute font-semibold w-full opacity-30 blur-[1px] whitespace-nowrap text-[50px] top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] z-[-1]">QWERTY KEYBOARD</p> -->
            <div v-for="(line, index) in shiftKey ? entries[0] : entries[1]" class="flex justify-center z-[3]">
                <div @click="addSelection(entry)"  v-for="(entry, index) in line" :key="index" :class="[alphabetsCombination.includes(entry) ? ' border-sky-400' : 'border-neutral-600'] " class="p-1 py-0 rounded-md border text-lg inline-block min-w-[20px] text-center m-1">{{ entry }}</div>
            </div>
        </div>
        <div class="font-mono text-lg font-thin px-2 text-center min-h-[30px]">{{ alphabetsCombination.join('') }}</div>
    </div>

</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore'
import { customizeStore } from '../../store/customizeStore';
import {alphabetsStore}  from '../../store/alphabetsModeStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_
const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const alphabets_ = alphabetsStore()
const { alphabetsCombination, useAlphabetCombination, shiftKey } = storeToRefs(alphabets_)

const capsQwertyKeyboard = [
    ['~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?']
]

const qwertyKeyboard = [
    ['`', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
]

const entries = [capsQwertyKeyboard, qwertyKeyboard]

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
        localStorageSettings.value.alphabets.combo = true
        localStorageSettings.value.alphabets.combination = alphabetsCombination.value
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    } else {
        localStorageSettings.value.alphabets.combo = false
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    }
}

const addSelection = (alphabet) => {
    let index = alphabetsCombination.value.indexOf(alphabet)
    if (index > -1) {
        alphabetsCombination.value.splice(index, 1)
        return
    }
    if (alphabetsCombination.value.length === 10) return
    alphabetsCombination.value.push(alphabet)
}

watch(alphabetsCombination, (newVal) => {
    if (newVal.length < 2) {
        useAlphabetCombination.value = false
        switchNext(customizers.value)
        return
    }
    
    if (useAlphabetCombination.value && newVal.length > 1) {
        localStorageSettings.value.alphabets.combo = true
        localStorageSettings.value.alphabets.combination = alphabetsCombination.value
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
        switchNext(customizers.value)
    } else {
        localStorageSettings.value.alphabets.combo = false
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    }
}, {deep: true})
</script>