<template>
    <div class="relative flex gap-2 justify-start max-w-[300px]">
        <p 
        @click="update(option)" 
        v-for="(option, index) in options" 
        :key="index" 
        :class="[selectedOption === option ? 'ring-green-500 text-green-500' : 'ring-black hover:ring-4']"
        class="text-center w-full px-3 max-w-[150px] py-1 rounded-md ring-[1px]">{{ option }}</p>
    </div>
    <TestWidth v-if="name === 'Test Width'" />
    <TestLines v-if="name === 'Test Lines'" />
    <Cursor v-if="name == 'Cursor'" />
    <Difficulty v-if="name === 'Difficulty'" />
    <FontRange v-if="name === 'Font size'" />
    <CharCombination v-if="name === ''" />
</template>

<script setup>
import Cursor from './Cursor.vue';
import {customizeStore} from '../../store/customizeStore';
import CharCombination from './CharCombination.vue';
import Difficulty from './Difficulty.vue';
import FontRange from './FontRange.vue';
import TestLines from './TestLines.vue';
import TestWidth from './TestWidth.vue';
import {ref} from 'vue'

const selectedOption = ref('off')

const props = defineProps({
    options: {
        default: [],
        value: Array
    },
    name: {
        default: 'Mode',
        value: String
    }
})

const customizestore = customizeStore()
const {updateSingleSetting} = customizestore

const update = (option) => {
    selectedOption.value = option
    let value = option === 'on' ? true : option === 'off' ? false : option
    updateSingleSetting(props.name, value)
}
</script>