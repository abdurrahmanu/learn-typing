<template>
    <div class="ring-[1px] ring-black mx-auto" :style="{'width': width}">{{ width }}</div>
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
import { computed, onMounted } from 'vue';
import { mainStore } from '../../store/mainStore';
import { settingsStore } from '../../store/settingsStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const containerWidth = ref(0)

const mainstore = mainStore()
const {testWidth, testContainerEl, testStyle} = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

const width = computed(() => {
    return testStyle.value.width
})

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