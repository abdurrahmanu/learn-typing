<template>
    <div class="w-[90%]">
        <p>{{ testLInes }}</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        min="1"
        max="30"
        class="range-style" 
        v-model="testLInes"/>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { mainStore } from '../../store/mainStore';
import { customizeStore } from '../../store/customizeStore';
import { storeToRefs } from 'pinia';

const mainstore = mainStore()
const {testLInes} = storeToRefs(mainstore)

const customizestore = customizeStore()
const { settingsToUpdate} = storeToRefs(customizestore)

watch(testLInes, newVal => {
    settingsToUpdate.value.push({
        name: Object.keys({testLInes})[0],
        value: newVal
    })
})
</script>