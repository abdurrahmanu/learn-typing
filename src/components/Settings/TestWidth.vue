<template>
    <div>
        <p>{{ testWidth }} characters</p>
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
import { watch } from 'vue';
import { settingsStore } from '../../store/settingsStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const { testWidth } = storeToRefs(settingstore)

watch(testWidth, newVal => {
     emit('emitUpdate', newVal)
})
</script>