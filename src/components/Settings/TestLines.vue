<template>
    <div>
        <p>{{ testLInes }}</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        min="1"
        :max="isMobile() ? 3 : 30"
        class="range-style" 
        v-model="testLInes"/>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { mainStore } from '../../store/mainStore';
import { settingsStore } from '../../store/settingsStore';
import { isMobile } from '../../composables/isMobile';
import { storeToRefs } from 'pinia';

const mainstore = mainStore()
const {testLInes} = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

watch(testLInes, newVal => {
    settingsToUpdate.value.push({
        name: Object.keys({testLInes})[0],
        value: newVal
    })
})
</script>