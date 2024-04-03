<template>
    <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
        <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
            <div class="flex gap-4">
                <input :checked="allCaps" @click="allCaps = !allCaps" type="checkbox">
                <p>All Caps</p>
            </div>
            <div class="font-mono">></div>
        </div>
        <p class="text-zinc-400">All texts and quotes will be converted to Uppercase</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { watch } from 'vue';
import { mainStore } from '../../store/mainStore';

const main = mainStore()
const {switchNext} = storeToRefs(main)

const store = customizeStore()
const {allCaps, customizers, customCamelCase} = storeToRefs(store)

watch(allCaps, (newVal) => {
    customizers.value['all-caps'] = newVal

    if (newVal && customCamelCase.value) {
        customCamelCase.value = false
    }
})
</script>
