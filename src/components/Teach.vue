<template>
    <div class="relative">        
        <div v-if="demo" class="py-10 mx-auto space-y-2 lg:flex w-fit">
            <div class="max-w-[600px] px-2 mx-auto lg:text-left text-center caveat font-normal lg:border-r w-[90%] md:text-sm leading-[2] lg:leading-[2.2] md:leading-[2.1] lg:text-base text-xs border-neutral-800">                
                <p>You are here to learn Touch Typing (typing without looking at your keyboard). In this method, your fingers are trained to know the locations of all the keys on a keyboard (muscle memory). It sounds like a Super power right!</p>
                <p>Your fingers assume  <span @click="showDefaultFingerPositions = true" class="px-3 py-1 animate-pulse ring-[1px] ring-green-500 rounded-md hover:animate-none hover:bg-green-400 hover:text-black">default positions</span> and they do not leave their positions.</p>
                <div class="flex flex-wrap justify-center gap-1 pt-2 text-xs lg:block lg:space-y-2 whitespace-nowrap">
                    <div :class="[fingersKeys.normal.littleFinger.includes(keyToShow.trim()) || fingersKeys.shift.littleFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-red-800 animate-pulse text-red-700' : '']" class="px-10 py-1 bg-red-400 w-fit">LITTLE FINGER / PINKY FINGER</div>
                    <div :class="[fingersKeys.normal.ringFinger.includes(keyToShow.trim()) || fingersKeys.shift.ringFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-red-800 animate-pulse text-red-700' : '']" class="px-10 py-1 bg-yellow-500 w-fit">RING FINGER</div>
                    <div :class="[fingersKeys.normal.middleFinger.includes(keyToShow.trim()) || fingersKeys.shift.middleFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-red-800 animate-pulse text-red-700' : '']" class="px-10 py-1 bg-orange-300 w-fit">MIDDLE FINGER</div>
                    <div :class="[fingersKeys.normal.indexFinger.includes(keyToShow.trim()) || fingersKeys.shift.indexFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-red-800 animate-pulse text-red-700' : '']" class="px-10 py-1 bg-green-500 w-fit">INDEX FINGER</div>
                    <div :class="[fingersKeys.normal.thumb.includes(keyToShow.trim()) || fingersKeys.shift.thumb.includes(keyToShow.trim()) ? 'ring-[2px] ring-red-800 animate-pulse text-red-700' : '']" class="px-10 py-1 w-fit bg-slate-400">THUMB</div>
                </div>
            </div>

            <!-- <img class="absolute w-32" src="/keyboard.png" alt=""> -->

            <div class="lg:max-w-[90%] m-auto w-fit pt-1 px-2">                
                <div @click="demo = false, pauseTyping = false" class="absolute uppercase text-sm top-1 p-1 m-auto text-red-600 ring ring-transparent rounded-md shadow-sm exo shadow-transparent w-fit hover:ring-[1px] hover:ring-red-400 left-1">Go back</div>
                <div class="p-2 space-y-1 border border-black rounded-md h-fit w-fit bg-neutral-900">            
                    <div v-for="(line, i) in shiftKey ? entries[0] : entries[1]" class="flex gap-[1px] md:gap-1">
                        <div @click="showSingleFinger = true, keyToShow = entry" :class="[fingerBg(entry), showDefaultFingerPositions && defaultFingerPositions.includes(entry.trim().toLowerCase()) ? 'ring ring-green-400' : '']" v-for="(entry, j) in line" :key="j" class="relative inline-block px-2 py-1 m-auto text-xs font-medium text-black whitespace-pre border border-black rounded-md shadow-sm md:px-3 shadow-black w-fit sm:text-sm finger hover:text-white">
                            <div class="min-w-[10px] text-center">{{ entry }}</div>
                            <div v-if="entry.trim() === keyToShow.trim() && showSingleFinger" :class="[fingerBg(entry), fingerHeight(entry)]" class="w-[25px] left-[50%] translate-x-[-50%] top-[70%] z-[9] rounded-t-full h-14 shadow-md shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-t-full after:bg-white after:top-[3px] after:left-[50%] after:translate-x-[-50%] absolute border border-neutral-700"></div>
                            <div v-if="defaultFingerPositions.includes(entry.trim().toLowerCase()) && showDefaultFingerPositions" :class="[fingerBg(entry), fingerHeight(entry)]" class="w-[25px] left-[50%] translate-x-[-50%] top-[70%] z-[9] rounded-t-full h-14 shadow-md shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-t-full after:bg-white after:top-[3px] after:left-[50%] after:translate-x-[-50%] absolute border border-neutral-700"></div>
                        </div> 
                    </div>
                </div>
    
                <div @click="shiftKey = !shiftKey" class="flex px-10 m-auto mt-5 mb-2 space-x-2 border border-black rounded-lg w-fit">
                    <input :checked="shiftKey" type="checkbox" class="accent-green-500" name="shiftkey" id="shiftkey">
                    <label for="shiftkey" class="font-medium">Shift Key</label>
                </div>
    
                <div class="flex gap-6 m-auto rotate-180 w-fit">                
                    <div :class="[fingersPosition.right.includes(keyToShow.trim()) ? 'ring' : '']" class="relative flex gap-2 pl-5">
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-14 bg-red-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-20 bg-yellow-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-24 bg-orange-300 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-[82px] bg-green-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-10 bg-slate-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <p class="absolute top-[-30px] rotate-180 font-bold left-[50%] translate-x-[-50%] pl-5 whitespace-nowrap">RIGHT HAND</p>
                    </div>
                    <div :class="[fingersPosition.left.includes(keyToShow.trim()) ? 'ring' : '']" class="relative flex gap-2 py-1 pl-5">
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-10 bg-slate-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-[82px] bg-green-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-24 bg-orange-300 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-20 bg-yellow-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-14 bg-red-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                        <p class="absolute top-[-30px] rotate-180 font-bold left-[50%] translate-x-[-50%] pl-5 whitespace-nowrap">LEFT HAND</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';

const keyboard = ref('normal')
const main = mainStore()
const { demo} = storeToRefs(main)
const customize = customizeStore()
const { pauseTyping } = storeToRefs(customize)
const shiftKey = ref(false)
const showSingleFinger = ref(false)
const keyToShow = ref('')

const showDefaultFingerPositions = ref(false)
const defaultFingerPositions = ['a', 's', 'd', 'f', ' ', 'j', 'k', 'l', ';', 'space', ':']

const capsQwertyKeyboard = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'back'],
    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
    ['caps     ', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '   enter'],
    [' shift            ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '          shift'],
    ['ctrl', 'fn', 'win', 'alt', '          space           ', 'alt', 'pt', 'ctrl', '<<', 'top', '>>']
]

const qwertyKeyboard = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'back'],
    ['tab ', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['caps     ', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '   enter'],
    [' shift            ', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '          shift'],
    ['ctrl', 'fn', 'win', 'alt', '            space          ', 'alt', 'pt', 'ctrl', '<<', 'top', '>>']
]

const entries = [capsQwertyKeyboard, qwertyKeyboard]

const fingersKeys = {
    normal: {
        littleFinger: ['1', '0', 'q', 'a', 'z', '`', 'tab', 'caps', 'shift', 'ctrl', '-', '=', 'back', 'p', '[', ']', '\\', ';', "'", 'enter', '/'],
        ringFinger: ['2', 'w', 's', 'x','9', 'o', 'l', '.'],
        middleFinger: ['3', 'e', 'd', 'c','8', 'i', 'k', ','],
        indexFinger: ['4', 'r', 'f', 'v', '5', 't', 'g', 'b','7', 'u', 'j', 'm', '6', 'y', 'h', 'n'],
        thumb: ['alt', 'space', 'alt'],
    },
    shift: {
        littleFinger: ['!', '~', 'q', 'a', 'z', 'tab', 'caps', 'shift', ')', '_', '+', 'p', 'back', 'enter', 'ctrl', '{', '}', '|', ":", '"', '?', '>'],
        ringFinger: ['@', 'w', 's', 'x','(', 'o', 'l', '.'],
        middleFinger: ['#', 'e', 'd', 'c','*', 'i', 'k', '<'],
        indexFinger: ['$', 'r', 'f', 'v', '%', 't', 'g', 'b','&', 'u', 'j', 'm', '^', 'y', 'h', 'n'],
        thumb: ['alt', 'space', 'alt'],
    }
}

const fingersPosition = {
    left: ['1'],
    right: []
}

const fingerBg = (character) => {
    let char = character.toLowerCase().trim()
    if (keyboard.value === 'normal') {       
        if (fingersKeys.normal.littleFinger.includes(char)) {
            return 'hover:bg-red-800 bg-red-400' 
        }
        if (fingersKeys.normal.ringFinger.includes(char)) {
            return 'hover:bg-yellow-800 bg-yellow-500'
        }
        if (fingersKeys.normal.middleFinger.includes(char)) {
            return 'hover:bg-orange-800 bg-orange-300'
        }
        if (fingersKeys.normal.indexFinger.includes(char)) {
            return 'hover:bg-green-800 bg-green-500'
        }
        if (fingersKeys.normal.thumb.includes(char)) {
            return 'hover:bg-red-800 bg-slate-400'
        }
    }

    else if (keyboard.value === 'shift') {        
        if (fingersKeys.shift.littleFinger.includes(char)) {
            return 'hover:bg-red-800 bg-red-400'
        }
        if (fingersKeys.shift.ringFinger.includes(char)) {
            return 'hover:bg-yellow-800 bg-yellow-500'
        }
        if (fingersKeys.shift.middleFinger.includes(char)) {
            return 'hover:bg-orange-800 bg-orange-300'
        }
        if (fingersKeys.shift.indexFinger.includes(char)) {
            return 'hover:bg-green-800 bg-green-500'
        }
        if (fingersKeys.shift.thumb.includes(char)) {
            return 'hover:bg-red-800 bg-slate-400'
        }
    }
}

const fingerHeight = (character) => {
    let char = character.toLowerCase().trim()
    if (fingersKeys.normal.littleFinger.includes(char)) {
        return 'h-[56px]' 
    }
    if (fingersKeys.normal.ringFinger.includes(char)) {
        return 'h-[70px]'
    }
    if (fingersKeys.normal.middleFinger.includes(char)) {
        return 'h-[86px]'
    }
    if (fingersKeys.normal.indexFinger.includes(char)) {
        return 'h-[72px]'
    }
    if (fingersKeys.normal.thumb.includes(char)) {
        return 'h-[40px]'
    }
}

watch(shiftKey, newVal => {
    if (newVal) {
        keyboard.value = 'shift'
    } else {
        keyboard.value = 'normal'
    }
})

watch(showDefaultFingerPositions, newVal => {
    if (newVal) {
        showSingleFinger.value = false
        setTimeout(() => {
            showDefaultFingerPositions.value = false
        }, 20000);
    }
})

watch(showSingleFinger, newVal => {
    if (newVal) {
        showDefaultFingerPositions.value = false
        setTimeout(() => {
            showSingleFinger.value = false
        }, 20000);
    }
})
</script>