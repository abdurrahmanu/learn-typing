<template>
    <div class="relative flex gap-2 justify-start max-w-[300px]">
        <p 
        @click="update(option)" 
        v-for="(option, index) in options" 
        :key="index" 
        :class="[ userOption === option ? 'ring-green-700 text-green-600' : 'ring-black hover:ring-4']"
        class="text-center w-full px-3 max-w-[150px] py-1 rounded-md ring-[1px]">{{ option }}</p>
    </div>
    <div v-for="(comp, name_, index) in components" :key="index">
        <component :is="comp" @emitUpdate="update" v-if="name === name_"></component>
    </div>
</template>

<script setup>
import Cursor from './Cursor.vue';
import {settingsStore} from '../../store/settingsStore';
import Difficulty from './Difficulty.vue';
import FontRange from './FontRange.vue';
import TestLines from './TestLines.vue';
import TestWidth from './TestWidth.vue';
import {computed, ref} from 'vue'
import { storeToRefs } from 'pinia';

const components = {
    'Test Width': TestWidth,
    'Test Lines': TestLines,
    'Cursor': Cursor,
    'Difficulty': Difficulty,
    'Font size': FontRange
}

const props = defineProps({
    options: {
        default: [],
        value: Array
    },
    name: {
        default: 'Mode',
        value: String
    }, 
    setting: {
        default: '',
        value: String
    }
})

const settingstore = settingsStore()
const {settings} = storeToRefs(settingstore)
const {updateSingleSetting} = settingstore

const userOption = computed(() => {
    return settings.value[props.setting] === false ? 'off' : 'on'
})

const update = (option) => {
    let value = option === 'on' ? true : option === 'off' ? false : option
    updateSingleSetting(props.setting, value)
}
</script>