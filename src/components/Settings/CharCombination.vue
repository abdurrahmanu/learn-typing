<template>
    <p @click="shiftKey = !shiftKey" class="text-center hover:ring-4 px-10 w-fit py-1 rounded-md ring-[1px]">{{ shiftKey ? 'Next Keys' : 'Previous Keys' }}</p>
    <div class="min-h-[25px] h-fit">Selection: {{ charsArray.join(' , ') }}</div>
    <div class="relative h-fit w-fit ring-[2px] ring-black p-2 rounded-md">            
        <div v-for="(line, index) in shiftKey ? entries[0] : entries[1]" class="flex gap-1 justify-center z-[3]">
            <div 
            @click="addSelection(entry)"  
            v-for="(entry, index) in line" 
            :key="index" 
            :class="[keyStyle(entry)]" 
            class="key-class">{{ entry }}</div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref, computed} from 'vue'
import {storeToRefs} from 'pinia';
import { settingsStore } from '../../store/settingsStore';
import { nextStore } from '../../store/nextStore';

const shiftKey = ref(false)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

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

const customize = settingsStore()
const { charsArray, mixCharacters} = storeToRefs(customize)

const addSelection = (alphabet) => {
    let index = charsArray.value.indexOf(alphabet)
    if (index > -1) {
        charsArray.value.splice(index, 1)
        return
    }
    if (charsArray.value.length === 10) return
    charsArray.value.push(alphabet)
}

const keyStyle = (entry) => {
    return charsArray.value.includes(entry) ? ' ring-blue-700' : 'ring-neutral-600'
}

watch(charsArray, (newVal) => {
    if (newVal.length < 2) mixCharacters.value = false
    else mixCharacters.value = true
}, {deep: true})

watch(mixCharacters, newVal => go())

const go = () => {
    goNext.value = true
}
</script>

<style scoped>
.key-class {
    @apply rounded-md ring-[1px] text-base inline-block min-w-[20px] text-center m-[3px] font-medium px-2 md:text-lg md:m-[5px] md:px-3
}
</style>