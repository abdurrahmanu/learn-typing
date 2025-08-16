<template>
    <div :class="[appTheme]" class="space-y-5 max-w-[700px] mx-auto w-[95%] rounded-md py-5 z-[3] text-center text-black text-base md:text-lg">
        <p>SELECT A MAXIMUM OF 15 CHARACTERS</p>
        <p @click="shiftKey = !shiftKey" class="hover:ring-4 px-10 py-1 rounded-md ring-[2px] ring-blue-600 w-fit mx-auto">{{ shiftKey ? 'NEXT KEYS' : 'PREVIOUS KEYS' }}</p>
        <div class="relative h-fit w-fit mx-auto ring-[2px] ring-black p-2 rounded-md space-y-1">            
            <div v-for="(line, index) in shiftKey ? entries[0] : entries[1]" class="flex gap-1 justify-center z-[3]">
                <div 
                @click="addSelection(entry)"  
                v-for="(entry, index) in line" 
                :key="index" 
                :class="[keyStyle(entry), appTheme]" 
                class="key-class">{{ entry }}</div>
            </div>
        </div>
        <div class="min-h-[25px] h-fit">Selection: {{ charsArray.join(' , ') }}</div>
        <p @click="charsArray.length && closeModal()" :class="[charsArray.length < 2 && 'opacity-30 ring-[1px]' ]" class="hover:ring-2 px-10 py-1 rounded-md ring-[2px] ring-green-600 w-fit mx-auto">{{!useCharacters && charsArray.length ? 'USE SELECTION' : 'CANCEL SELECTION'}}</p>
    </div>
</template>

<script setup>
const shiftKey = ref(false)

const settingstore = settingsStore()
const {toggleCustomModal} = storeToRefs(settingstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const theme_ = themeStore()
const { appTheme, theme } = storeToRefs(theme_)

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
const { charsArray, useCharacters} = storeToRefs(customize)

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
    if (charsArray.value.includes(entry)) {
        if (theme.value === 'dark') {
            return `bg-white text-neutral-900`
        } else {
            return `bg-neutral-700 text-white`
        }
    } else {
        return 'ring-[1px] ring-neutral-900'
    }
}

const closeModal = () => {
    useCharacters.value = !useCharacters.value
    toggleCustomModal.value = !toggleCustomModal.value
    goNext.value = true
}
</script>

<style scoped>
.key-class {
    @apply rounded-md inline-block min-w-[10px] w-fit m-[2px] font-medium md:m-1 px-3 py-1 text-[13px] sm:text-base
}
</style>