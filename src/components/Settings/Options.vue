<template>
    <div class="relative flex gap-2 justify-start max-w-[300px]">
        <p @click="update(option)" v-for="(option, index) in options" :key="index" class="text-center hover:ring-4 w-full px-3 max-w-[150px] py-1 rounded-md ring-[1px]">{{ option }}</p>
    </div>
    <Cursor v-if="name == 'Cursor'" />
    <Difficulty v-if="name === 'Difficulty'" />
    <Fonts v-if="name === 'Font size'" />
    <CharCombination v-if="name === ''" />
</template>

<script setup>
import Cursor from './Cursor.vue';
import {customizeStore} from '../../store/customizeStore';
import CharCombination from './CharCombination.vue';
import Difficulty from './Difficulty.vue';
import Fonts from './Fonts.vue';

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
    let value = option === 'on' ? true : option === 'off' ? false : option
    updateSingleSetting(props.name, value)
}
</script>