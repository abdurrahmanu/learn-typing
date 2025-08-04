<template>
    <div class="relative flex gap-4 justify-start max-w-[300px]">
        <p 
        @click="update(option)" 
        v-for="(option, index) in options" 
        :key="index" 
        :class="[selectedOption(option)]"
        class="text-center font-mono font-bold w-full px-3 max-w-[150px] py-1 ring-[3px] rounded-full uppercase">{{ option }}</p>
    </div>
    <div v-for="(comp, name_, index) in components" :key="index">
        <component :is="comp" @emitUpdate="update" v-if="name === name_"></component>
    </div>
</template>

<script setup>
import Cursor from './Cursor.vue';
import {settingsStore} from '../../store/settingsStore';
import { themeStore } from '../../store/themeStore';
import Difficulty from './Difficulty.vue';
import FontRange from './FontRange.vue';
import TestLines from './TestLines.vue';
import TestWidth from './TestWidth.vue';
import {ref, computed} from 'vue'
import { storeToRefs } from 'pinia';

const themestore = themeStore()
const {theme} = storeToRefs(themestore)

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

const userOption = ref(settings.value[props.setting] === false ? 'off' :
                        settings.value[props.setting] === true ? 'on' : 
                             settings.value[props.setting])

const update = (option) => {
    userOption.value = option
    let value = option === 'on' ? true : option === 'off' ? false : option
    updateSingleSetting(props.setting, value)
}

const selectedOption = (option) => {
    let style = ''
    if (userOption.value === option) {
        if (theme.value === 'dark') style = 'bg-white text-black ring-green-500'
        else style = 'ring-green-700 bg-neutral-600 text-white' 
    } else {
        if (theme.value === 'dark') style = ''
        else style = 'ring-black hover:ring-4'
    }

    return style
}
</script>