<template>
    <div>
        <div :style="width" class="absolute ring-[1px] ring-black mx-auto text-center center-x bottom-16">Test box width</div>
        {{ testWidth }}
        <input
        name="range" 
        type="range" 
        step="1"
        min="20"
        :max="100"
        class="range-style" 
        v-model="testWidth"/>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { mainStore } from '../../store/mainStore';
import { settingsStore } from '../../store/settingsStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const mainstore = mainStore()
const {testWidth, testStyle} = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

const width = computed(() => {
    return {
        'width': testStyle.value.width,
        'max-width': `min(1350px, 90%)`
    }
})

watch(testWidth, newVal => {
    settingsToUpdate.value.push({
        name: Object.keys({testWidth})[0],
        value: newVal
    })
})
</script>