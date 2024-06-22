<template>
    <div class="flex items-center gap-4">
        <div v-if="useCustomText" class="relative">
            <div v-if="howToUseCustomText === 'use only custom'" class="text-[10px] p-[2px] px-3 border border-neutral-500 rounded-md uppercase text-green-500">use only custom text</div>
            <div v-if="howToUseCustomText === 'use both system and custom'" class="text-[10px] p-[2px] px-3 border border-neutral-500 rounded-md uppercase text-green-500">use custom text with system text</div>
            <div class="absolute top-[110%] z-[9] left-[50%] translate-x-[-50%] bg-neutral-700 text-xs overflow-y-auto max-h-[200px]" v-if="Object.keys(customTexts).length && toggleSelect">
                <div @click="startUsingCustomText(value)" class="p-1 px-3 border-b hover:bg-neutral-800 whitespace-nowrap border-b-neutral-900" v-for="(value, key, index) in customTexts" :key="index">{{ key }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch} from 'vue';
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'

const toggleSelect = ref(false)
const store = mainStore()
const {  howToUseCustomText, useCustomText, customTexts, storedTest} = storeToRefs(store)
const { switchNext } = store

const customize = customizeStore()
const { customizers } = storeToRefs(customize)

const startUsingCustomText =  (text) => {
    storedTest.value = text
    toggleSelect.value = !toggleSelect.value
    switchNext(customizers.value)
}
</script>










