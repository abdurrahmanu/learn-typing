<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-1 pl-5">
        <div @click="toggle" class="flex w-full p-1 space-x-4 border border-transparent rounded-sm">
            <div class="relative w-4 h-4">
                <input name="letter-combination" :disabled="!(mixCharactersArray.length > 1)" :checked="mixCharacters"   type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer border-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                <good />
            </div>
            <label for="id" class="font-medium w-fit"> 
                <span class="text-[13px] uppercase font-bold">Characters Combinations</span>
                <span v-if="mixCharacters" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
            </label>
        </div>
        <div class="px-4 font-[400]">
            <p>Toggle to randomly repeat and shuffles your selection. A minimum of two characters and maximum of ten.</p>
            <div class="w-fit m-auto px-10 text-center text-[15px] min-h-[25px] h-fit" :class="[mixCharactersArray.length ? 'ring-[1px] ring-blue-600 rounded-md' : '']">[ {{ mixCharactersArray.join(' , ') }} ]</div>
            <div @click="shiftKey = !shiftKey" class="flex m-auto my-1 space-x-2 w-fit">
                <input :checked="shiftKey" type="checkbox" class="checked:accent-green-500 hover:accent-green-700" name="shiftkey" id="shiftkey">
                <label for="shiftkey" class="font-medium">Shift Key</label>
            </div>
        </div>

        <div class="relative m-auto h-fit w-fit">            
            <div v-for="(line, index) in shiftKey ? entries[0] : entries[1]" class="flex gap-[2px] justify-center z-[3]">
                <div @click="addSelection(entry)"  v-for="(entry, index) in line" :key="index" :class="[mixCharactersArray.includes(entry) ? ' ring-blue-700' : 'ring-neutral-600'] " class="px-[2px] rounded-md ring-[1px] text-base inline-block min-w-[20px] text-center m-[3px] font-medium">{{ entry }}</div>
            </div>
        </div>
    </div>

<div></div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore'
import { customizeStore } from '../../store/customizeStore';
import { themeStore } from '../../store/themeStore';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

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
const {customizers, mixCharactersArray, mixCharacters, shiftKey} = storeToRefs(customize)

const toggle = () => {
    if (mixCharactersArray.value.length > 1) {
        mixCharacters.value = !mixCharacters.value
        switchNext(customizers.value)
    }
}

const addSelection = (alphabet) => {
    let index = mixCharactersArray.value.indexOf(alphabet)
    if (index > -1) {
        mixCharactersArray.value.splice(index, 1)
        return
    }
    if (mixCharactersArray.value.length === 10) return
    mixCharactersArray.value.push(alphabet)
}

watch(mixCharactersArray, (newVal) => {
    if (newVal.length < 2) {
        mixCharacters.value = false
        switchNext(customizers.value)
        return
    }
}, {deep: true})

</script>