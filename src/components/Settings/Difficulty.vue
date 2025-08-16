<template>
    <div>
        <div class="flex flex-wrap gap-2">
            <div
            v-for="(diff, index) in difficulties" 
            :key="index" 
            @click="changeDiff(diff)" 
            class="cursor-pointer flex px-3 py-1 ring-[1px] rounded-md mx-1" 
            :class="[difficulty === diff ? 'ring-green-700 text-green-700' : 'ring-black hover:ring-4']">
                {{diff}}
            </div>
        </div>

        <div class="flex flex-wrap gap-6 pt-4 text-[16px]">
            <div>Accuracy: {{ result.accuracy }}</div>
            <div>WPM: {{ result.wpm }}</div>
            <div>Error percentage {{ result.errorPercentage }}</div>
        </div>
    </div>
</template>

<script setup>
import {computed, watch, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {settingsStore} from '../../store/settingsStore'

const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)

const difficulty = ref(settings.value.difficulty)

const difficulties = ['beginner', 'amateur', 'expert']

const changeDiff = (diff) => {
    difficulty.value = diff
}

const result = computed(() => {
    return {        
        accuracy: difficulty.value === 'beginner' ? '70%' : difficulty.value === 'amateur' ? '80%' : '95%',
        wpm: difficulty.value === 'beginner' ? '50' : difficulty.value === 'amateur' ? '65' : '85',
        errorPercentage: difficulty.value === 'beginner' ? '30%' : difficulty.value === 'amateur' ? '20%' : '10%',
    }
})

watch(difficulty, newVal => {    
     emit('emitUpdate', newVal)
})
</script>