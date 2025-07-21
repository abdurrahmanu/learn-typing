<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="flex items-center gap-2 py-4 pl-5 font-[400]">           
        <div class="w-[90%]">
            <div class="flex items-center justify-between">
                <div class="text-[13px] font-bold whitespace-nowrap">TEST FONT SIZE</div> 
                <div class="min-w-[40px] text-center text-[13px] font-bold">{{ fontSize }}px</div>
            </div>
            <input name="range" type="range" class="w-full h-1 outline-none bg-blue-500 accent-blue-800 appearance-none" v-model="range"/>
        </div>
    </div> 
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { countdownStore } from '../../store/countdownStore'
import { customizeStore } from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import {nextStore} from '../../store/nextStore'
import { typingStateStore } from '../../store/typingStateStore';

const theme_ = themeStore()
const {theme} = theme_

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {playerInputLength} = typingstatestore

const customizestore = customizeStore()
const { customizers, settingsToUpdate, font, range} = storeToRefs(customizestore)

const count = countdownStore()
const {clearCounter} = count

const fontSize = computed(() => {
    return range.value <= 1 ? 16 : (16 + (range.value * 0.26)).toFixed(2)
})

watch(fontSize, (newVal) => {
    font.value = newVal
    let fontsize = newVal

    settingsToUpdate.value.push({
        name: Object.keys({fontsize})[0],
        value: fontsize
    })

    if (playerInputLength.value) {        
        if (customizers.value['timer']) clearCounter()
        goNext.value = true
    }
})
</script>












