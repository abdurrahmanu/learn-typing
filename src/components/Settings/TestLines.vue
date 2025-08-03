<template>
    <div>
        <p>{{ testLines }}</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        min="1"
        :max="isMobile() ? 3 : 15"
        class="range-style" 
        v-model="testLines"/>
    </div>
</template>

<script setup>
import { settingsStore } from '../../store/settingsStore';
import { isMobile } from '../../composables/isMobile';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';

const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const { settings} = storeToRefs(settingstore)

const testLines = ref(settings.value['testLines'])

watch(testLines, newVal => {
     emit('emitUpdate', testLines)
})
</script>