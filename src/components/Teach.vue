<template>
    <div>        
        <div v-if="demo" class="relative py-2 mx-auto space-y-2 w-fit">
            <div class="flex justify-between font-bold">                
                <div @click="demo = false, pauseTyping = false, showImage = false" class="uppercase text-[14px]  p-1 m-auto text-red-600 ring ring-transparent rounded-md shadow-sm exo shadow-transparent w-fit hover:ring-[1px] hover:ring-red-400">Go back</div>
            </div>

            <div class="max-w-[1200px] m-auto lg:flex">                
                <div class="max-w-[700px] lg:max-w-[40%] px-2 mx-auto lg:text-left text-center font-normal lg:border-r w-[90%] leading-[2] lg:leading-[2.2] md:leading-[2] text-[13px] border-neutral-800">                
                    <p>You are here to learn <span class="text-blue-500 underline hover:text-blue-400">Touch-typing</span> (typing without looking at your keyboard). Your fingers are trained to know and navigate the locations of all the keys on a keyboard all by themselves (muscle memory). It sounds like a Super power right? Your fingers assume  
                        <span @click="showDefaultFingerPositions = true" class="px-3 py-1 animate-pulse ring-[1px] ring-green-500 rounded-md hover:animate-none hover:bg-green-400 hover:text-black uppercase cursor-pointer whitespace-nowrap">default positions</span> 
                        <span>  and do not leave their positions. They go back and forth their initial positions while stroking other keys.  </span>
                        <span @click="" class="px-3 py-1 animate-pulse ring-[1px] ring-red-500 rounded-md hover:animate-none hover:bg-red-400 hover:text-black uppercase cursor-pointer">video</span>
                    </p>
                    <div class="hidden pt-2 text-[13px] text-black cursor-default lg:block lg:space-y-2 whitespace-nowrap opacity-80">
                        <div :class="[fingersKeys.normal.littleFinger.includes(keyToShow.trim()) || fingersKeys.shift.littleFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-green-800 animate-pulse' : '']" class="px-10 py-1 bg-red-400 w-fit">LITTLE FINGER / PINKY FINGER</div>
                        <div :class="[fingersKeys.normal.ringFinger.includes(keyToShow.trim()) || fingersKeys.shift.ringFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-green-800 animate-pulse' : '']" class="px-10 py-1 bg-yellow-500 w-fit">RING FINGER</div>
                        <div :class="[fingersKeys.normal.middleFinger.includes(keyToShow.trim()) || fingersKeys.shift.middleFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-green-800 animate-pulse' : '']" class="px-10 py-1 bg-orange-300 w-fit">MIDDLE FINGER</div>
                        <div :class="[fingersKeys.normal.indexFinger.includes(keyToShow.trim()) || fingersKeys.shift.indexFinger.includes(keyToShow.trim()) ? 'ring-[2px] ring-green-800 animate-pulse' : '']" class="px-10 py-1 bg-green-500 w-fit">INDEX FINGER</div>
                        <div :class="[fingersKeys.normal.thumb.includes(keyToShow.trim()) || fingersKeys.shift.thumb.includes(keyToShow.trim()) ? 'ring-[2px] ring-green-800 animate-pulse' : '']" class="px-10 py-1 w-fit bg-slate-400">THUMB</div>
                    </div>
                </div>
                
                <!-- <div class="relative pt-1 lg:m-l-0 m-auto max-w-[90%] lg:w-[50%]">                
                    <div v-if="showDefaultFingerPositions && showImage" class="absolute top-0 bottom-0 left-0 right-0 bg-black z-[999] w-fit m-auto">
                        <p @click="showDefaultFingerPositions = false, showImage = false" class="absolute w-fit h-fit bottom-5 left-[50%] translate-x-[-50%] text-red-500 p-[1px] px-4 ring-[1px] ring-red-600 rounded-md hover:bg-red-600 hover:text-white">X</p>
                        <img class="" src="/keyboard.png" alt="">
                    </div>
                    <div class="p-3 space-y-1 text-center border border-black font-mono rounded-md h-fit bg-white opacity-80 lg:max-w-[90%] m-auto">            
                        <div v-for="(line, i) in qwertyKeyboard" class="flex gap-[2px] max-w-[500px] w-[100%] m-auto">
                            <div @click="showSingleFinger = true, keyToShow = entry" :class="[fingerBg(entry), keysWidth(entry), divisionLine(entry), showDefaultFingerPositions && defaultFingerPositions.includes(entry.toLowerCase()) ? 'ring-[2px] ring-green-400' : '']" v-for="(entry, j) in line" :key="j" class="relative flex-grow py-1 text-sm text-black whitespace-pre border border-blue-800 rounded-md shadow-sm cursor-pointer shadow-black hover:text-white">
                                <div v-if="doubleCharacterKeys[entry]" class="absolute text-sm top-[-2px] left-[1px]">{{ doubleCharacterKeys[entry] }}</div>
                                <div>{{ entry }}</div>
                                <div v-if="entry.trim() === keyToShow.trim() && showSingleFinger" :class="[fingerBg(entry), fingerHeight(entry)]" class="w-[25px] left-[50%] translate-x-[-50%] top-[70%] z-[9] rounded-t-full h-14 shadow-md shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-t-full after:bg-white after:top-[3px] after:left-[50%] after:translate-x-[-50%] absolute border border-neutral-700"></div>
                                <div v-if="defaultFingerPositions.includes(entry.trim().toLowerCase()) && showDefaultFingerPositions" :class="[fingerBg(entry), fingerHeight(entry)]" class="w-[25px] left-[50%] translate-x-[-50%] top-[70%] z-[9] rounded-t-full h-14 shadow-md shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-t-full after:bg-white after:top-[3px] after:left-[50%] after:translate-x-[-50%] absolute border border-neutral-700"></div>
                            </div> 
                        </div>
                    </div>
        
                    <div class="flex gap-2 pt-4 m-auto w-fit">                    
                        <div v-if="showDefaultFingerPositions" @click="showImage = !showImage" class="flex px-10 m-auto mt-5 mb-2 space-x-2 border border-black rounded-lg w-fit hover:ring-[1px] hover:ring-green-500 cursor-pointer">
                            <input :checked="showImage" type="checkbox" class="checked:accent-green-500 hover:accent-green-700" name="shiftkey" id="shiftkey">
                            <label for="shiftkey" class="font-medium">Show Image</label>
                        </div>
                    </div>
        
                    <div class="flex gap-6 m-auto mt-6 rotate-180 w-fit">                
                        <div :class="[fingersPosition.right.includes(keyToShow.trim().toLowerCase()) ? 'ring' : '']" class="relative flex gap-2 pl-5">
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-14 bg-red-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-20 bg-yellow-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-24 bg-orange-300 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-[82px] bg-green-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-10 bg-slate-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <p class="absolute top-[-30px] rotate-180 font-bold left-[50%] translate-x-[-50%] pl-5 whitespace-nowrap">RIGHT HAND</p>
                        </div>
                        <div :class="[fingersPosition.left.includes(keyToShow.trim().toLowerCase()) ? 'ring' : '']" class="relative flex gap-2 py-1 pl-5">
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-10 bg-slate-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-[82px] bg-green-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-24 bg-orange-300 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-20 bg-yellow-500 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <div class="w-[20px] left-[50%] translate-x-[-50%] top-[85%] z-[9] rounded-b-full h-14 bg-red-400 shadow-sm shadow-black z-1 after:w-[90%] after:absolute after:h-[20px] after:rounded-b-full after:bg-white after:bottom-[3px] after:left-[50%] after:translate-x-[-50%]"></div>
                            <p class="absolute top-[-30px] rotate-180 font-bold left-[50%] translate-x-[-50%] pl-5 whitespace-nowrap">LEFT HAND</p>
                        </div>
                    </div>
                    
                </div> -->
            </div>
            
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const keyboard = ref('normal')
const store = mainStore()
const { demo} = storeToRefs(store)
const customize = customizeStore()
const { pauseTyping, customizers } = storeToRefs(customize)
const shiftKey = ref(false)
const showSingleFinger = ref(false)
const keyToShow = ref('')
const showImage = ref(false)

const showDefaultFingerPositions = ref(false)
const defaultFingerPositions = ['a', 's', 'd', 'f', ' ', 'j', 'k', 'l', ';', 'space', ':']

const doubleCharacterKeys = {
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?'
}

const qwertyKeyboard = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
    ['ctrl', 'alt', 'space',  'alt', 'ctrl']
]

const fingersKeys = {
    normal: {
        littleFinger: ['1', '0', 'q', 'a', 'z', '`', 'tab', 'caps lock', 'shift', 'ctrl', '-', '=', 'backspace', 'p', '[', ']', '\\', ';', "'", 'enter', '/'],
        ringFinger: ['2', 'w', 's', 'x','9', 'o', 'l', '.'],
        middleFinger: ['3', 'e', 'd', 'c','8', 'i', 'k', ','],
        indexFinger: ['4', 'r', 'f', 'v', '5', 't', 'g', 'b','7', 'u', 'j', 'm', '6', 'y', 'h', 'n'],
        thumb: ['alt', 'space', 'alt'],
    },
    shift: {
        littleFinger: ['!', '~', 'q', 'a', 'z', 'tab', 'caps lock', 'shift', ')', '_', '+', 'p', 'backspace', 'enter', 'ctrl', '{', '}', '|', ":", '"', '?', '>'],
        ringFinger: ['@', 'w', 's', 'x','(', 'o', 'l', '.'],
        middleFinger: ['#', 'e', 'd', 'c','*', 'i', 'k', '<'],
        indexFinger: ['$', 'r', 'f', 'v', '%', 't', 'g', 'b','&', 'u', 'j', 'm', '^', 'y', 'h', 'n'],
        thumb: ['alt', 'space', 'alt'],
    }
}

const fingersPosition = {
    left: ['1', '`', '~', '!', '2', '@', '3', '#', '4', '$', '5', '%', 'q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b', 'caps lock', 'tab'],
    right: ['6', '^', '7', '&', '8', '*', '9', '(', '0', ')', '-', '_', '=', '+', 'backspace', 'y', 'u', 'i', 'o', 'p', '[', '{', ']', '}', '\\', '|', 'h', 'j', 'k', 'l', ';', ':', '"', "'", 'n', 'm', ',', '<', '.', '>', '/', '?'], 
}


const divisors = ['5', 't', 'g', 'b', '%', 'T', 'G', 'B']

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
            return 'hover:bg-slate-800 bg-slate-400'
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
            return 'hover:bg-slate-800 bg-slate-400'
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

const divisionLine = (character) => {
    let char = character.toLowerCase().trim()
    if (divisors.includes(character)) {
        // return `after:border-r-2 after:border-r-white after:bg-red-500 after:absolute after:right-[-1px] sm:after:right-[-2px] lg:after:right-[-3px] after:top-[50%] after:translate-y-[-50%] after:h-10`
    }
}

const wideKeys = [
    'caps lock',
    'shift',
    'space',
    'enter',
    'tab',
]

const keysWidth = (character) => {
    if (wideKeys.includes(character)) {
        if (character === 'caps lock') return 'w-fit min-w-[13.32%]'
        else if (character === 'shift') return 'w-fit min-w-[16.65%] text-left pl-2'
        else if (character === 'space') return 'text-center w-[70%]'
        else if (character === 'enter') return 'w-fit min-w-[13.32%]'
        else if (character === 'tab') return 'w-fit min-w-[8%]'
        else return 'w-[6.67%] text-center'
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
    } else {
        showImage.value = false
    }
})

watch(showSingleFinger, newVal => {
    if (newVal) {
        showDefaultFingerPositions.value = false
        setTimeout(() => {
            keyToShow.value = ''
            showSingleFinger.value = false
        }, 5000);
    }
})
</script>