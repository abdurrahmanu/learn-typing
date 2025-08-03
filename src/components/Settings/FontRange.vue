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
import { watch} from 'vue'
import { storeToRefs } from 'pinia';
import { mainStore } from '../../store/mainStore';

const emit = defineEmits(['emitUpdate'])

const mainstore = mainStore()
const {fontSize, range, minFontSize, maxFontSize} = storeToRefs(mainstore)

watch(range, (newVal) => {
    emit('emitUpdate', +newVal + minFontSize.value)
})
</script>












