<template>
    <div>
        <p class="flex flex-col justify-center pb-1" :style="{'font-size': fontSize + 'px', 'min-height': maxFontSize + 'px'}">{{ fontSize }}px</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        :max="maxFontSize - minFontSize"
        class="range-style" 
        v-model="range"/>
    </div>
</template>

<script setup>
import {computed, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { countdownStore } from '../../store/countdownStore'
import { settingsStore } from '../../store/settingsStore'
import {nextStore} from '../../store/nextStore'
import { typingStateStore } from '../../store/typingStateStore';
import { mainStore } from '../../store/mainStore';

const mainstore = mainStore()
const {fontSize, range, minFontSize, maxFontSize} = storeToRefs(mainstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {playerInputLength} = typingstatestore

const settingstore = settingsStore()
const { settings, settingsToUpdate} = storeToRefs(settingstore)

const count = countdownStore()
const {clearCounter} = count

watch(range, (newVal) => {
    fontSize.value = +newVal + minFontSize.value
    
    settingsToUpdate.value.push({
        name: Object.keys({fontSize})[0],
        value: newVal
    })

    if (playerInputLength.value) {        
        if (settings.value['countdown']) clearCounter()
        goNext.value = true
    }
})
</script>












