<template>
    <div class="py-4 pb-0">
        <div class="flex justify-center mx-auto max-w-[600px] rounded-md w-[90%] items-center gap-2 border px-2 py-1">           
            <div class="text-[12px] whitespace-nowrap">FONT SIZE</div> 
            <input type="range" class="w-full bg-green-600 h-[2px] appearance-none" v-model="range"/>
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


const store = mainStore()
const {font, range, timedTyping, playerInput} = storeToRefs(store)
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
        switchNext(customizers.value, 'restart')
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Exo:ital,wght@0,100..900;1,100..900&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Shadows+Into+Light&display=swap');

.amiri {
    font-family: 'Amiri';
}

.exo {
    font-family: 'Exo';
}

.roboto {
    font-family: 'Roboto', monospace;
}
</style>












