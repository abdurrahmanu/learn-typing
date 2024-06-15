<template>
    <div class="py-4 pb-0">
        <div class="flex justify-center mx-auto max-w-[600px] rounded-md w-[90%] items-center gap-2 px-2 py-1">           
            <div class="text-[12px] whitespace-nowrap">TEST FONT</div> 
            <input  name="range" type="range" class="w-full h-1 bg-green-600 appearance-none" v-model="range"/>
            <div class="min-w-[40px] text-center text-xs px-4">{{ fontSize }}px</div>
        </div>
        <!-- <div class="px-3 pt-3 pl-3 text-center">
            <p class="text-lg font-bold">FONTS</p>
            <p :class="[]" class="py-1 hover:bg-neutral-800 amiri">The quick brown fox jumps over the lazy dog </p>
            <p :class="[]" class="py-1 hover:bg-neutral-800 exo">The quick brown fox jumps over the lazy dog </p>
            <p :class="[]" class="py-1 hover:bg-neutral-800 roboto">The quick brown fox jumps over the lazy dog </p>
        </div> -->
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import { mainStore } from '../../store/mainStore';
import { customizeStore } from '../../store/customizeStore';
import { storeToRefs } from 'pinia';
import { countdownStore } from '../../store/countdownStore'
import { fontStore } from '../../store/fontStore'

const font_ = fontStore()
const { font, range} = storeToRefs(font_)

const store = mainStore()
const {timedTyping, playerInput} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const count = countdownStore()
const {clearCounter} = count

const fontSize = computed(() => {
    return range.value <= 1 ? 16 : (16 + (range.value * 0.16)).toFixed(2)
})

watch(fontSize, (newVal) => {
    font.value = newVal
    if (playerInput.value.length) {        
        if (timedTyping.value) clearCounter()
        switchNext(customizers.value, 'restart' )
    }
})
</script>












