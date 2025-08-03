<template>
    <div>
        <div :style="width" class="absolute border-b-[2px] pb-[2px] border-b-black mx-auto text-center center-x bottom-16 text-xs uppercase font-bold">Test box width</div>
        <!-- {{ testWidth }} -->
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
import { computed, watch, ref} from 'vue';
import { mainStore } from '../../store/mainStore';
import { settingsStore } from '../../store/settingsStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['emitUpdate'])

const mainstore = mainStore()
const { testStyle} = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settings} = storeToRefs(settingstore)

const testWidth = ref(settings.value['test-width'])

const width = computed(() => {
    return {
        'width': testStyle.value.width,
        'max-width': `min(1350px, 90%)`
    }
})

watch(testWidth, newVal => {
     emit('emitUpdate', newVal)
})
</script>