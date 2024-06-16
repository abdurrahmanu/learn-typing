<template>
    <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="flex max-w-[600px] items-center gap-2 py-4 pl-5">           
        <div class="w-[90%]">
            <div class="flex justify-between items-center">
                <div class="text-sm whitespace-nowrap font-medium">TEST FONT</div> 
                <div class="min-w-[40px] text-center text-sm font-mono">{{ fontSize }}px</div>
            </div>
            <input  name="range" type="range" class="w-full h-1" v-model="range"/>
        </div>
    </div> 
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import { mainStore } from '../../store/mainStore';
import { customizeStore } from '../../store/customizeStore';
import { storeToRefs } from 'pinia';
import { countdownStore } from '../../store/countdownStore'
import { fontStore } from '../../store/fontStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

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












