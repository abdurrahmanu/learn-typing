<template>
    <div class="w-[90%]">
        <p>{{ fontSize }}px</p>
        <input name="range" type="range" class="w-full h-1 outline-none bg-blue-500 accent-blue-800 appearance-none" v-model="range"/>
    </div>
</template>

<script setup>
import {computed, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { countdownStore } from '../../store/countdownStore'
import { customizeStore } from '../../store/customizeStore'
import {nextStore} from '../../store/nextStore'
import { typingStateStore } from '../../store/typingStateStore';

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {playerInputLength} = typingstatestore

const customizestore = customizeStore()
const { customizers, settingsToUpdate, font, range} = storeToRefs(customizestore)

const count = countdownStore()
const {clearCounter} = count

const fontSize = computed(() => {
    return range.value <= 1 ? 60 : (60 + (range.value * 0.26)).toFixed(2)
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












