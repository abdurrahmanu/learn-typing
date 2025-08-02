<template>
    <div>
        <p>{{ testWidth }}</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        min="20"
        :max="200"
        class="range-style" 
        v-model="testWidth"/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { mainStore } from '../../store/mainStore';
import { settingsStore } from '../../store/settingsStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const containerWidth = ref(0)

const mainstore = mainStore()
const {testWidth, testContainerEl} = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

onMounted(() => {
    if (testContainerEl.value instanceof HTMLElement) {
        containerWidth.value = testContainerEl.value.getBoundingClientRect().top
    }
})

watch(testWidth, newVal => {
    settingsToUpdate.value.push({
        name: Object.keys({testWidth})[0],
        value: newVal
    })
})
</script>