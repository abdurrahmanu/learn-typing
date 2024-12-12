<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-1 pl-5">
        <div @click="toggle" class="flex w-full p-1 space-x-4 border border-transparent rounded-sm">
            <input :disabled="!(alphabetsCombination.length > 1)" :checked="useAlphabetCombination"  type="checkbox" class="checked:accent-green-500 hover:accent-green-700" name="letter-combination" id="id">
            <label for="id" class="text-sm font-medium w-fit"> 
                <span>Characters Combinations</span>
                <span v-if="useAlphabetCombination" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
            </label>
        </div>
        <div class="px-4 font-[400]">
            <p>Toggle to randomly repeat and shuffles your selection. A minimum of two characters and maximum of ten.</p>
            <div @click="shiftKey = !shiftKey" class="flex m-auto my-1 space-x-2 w-fit">
                <input :checked="shiftKey" type="checkbox" class="checked:accent-green-500 hover:accent-green-700" name="shiftkey" id="shiftkey">
                <label for="shiftkey" class="font-medium">Shift Key</label>
            </div>
        </div>

        <div class="relative m-auto h-fit w-fit">            
            <div v-for="(line, index) in shiftKey ? entries[0] : entries[1]" class="flex justify-center z-[3]">
                <div @click="addSelection(entry)"  v-for="(entry, index) in line" :key="index" :class="[alphabetsCombination.includes(entry) ? ' border-sky-400' : 'border-neutral-600'] " class="p-[2px] py-0 rounded-md border text-[15px] inline-block min-w-[20px] text-center m-[1px] font-medium">{{ entry }}</div>
            </div>
        </div>
        <div class=" text-lg px-2 text-center min-h-[30px] font-bold">{{ alphabetsCombination.join('') }}</div>
    </div>

<div></div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore'
import { customizeStore } from '../../store/customizeStore';
import {alphabetsStore}  from '../../store/alphabetsModeStore';
import { themeStore } from '../../store/themeStore';
import { cookiesStore } from '../../store/cookiesStore';
import { updateDB } from '../../composables/updateDB';

const cookies = cookiesStore()
const {useCookies} = storeToRefs(cookies)

const theme_ = themeStore()
const {theme} = theme_

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
}, {deep: true})

</script>