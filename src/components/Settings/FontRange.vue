<template>
    <div>
        <p class="flex flex-col justify-center pb-1" :style="{'font-size': fontSize + 'px', 'min-height': maxFontSize + 'px'}">{{ +font }}px</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        :min="minFontSize"
        :max="maxFontSize"
        class="range-style" 
        v-model="range"/>
    </div>
</template>

<script setup>
import { computed, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { settingsStore } from '../../store/settingsStore';

const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const {fontSize, minFontSize, maxFontSize, range, settings} = storeToRefs(settingstore)

const font = computed(() => settings.value.fontsize)

watch(range, (newVal) => {
    let font = +newVal
    emit('emitUpdate', font)
})
</script>












