<template>
    <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
        <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
            <div class="flex gap-4">
                <input :checked="customCamelCase" @click="customCamelCase = !customCamelCase" type="checkbox">
                <p>CusTOm cAMeL caSE</p>
            </div>
            <div class="font-mono">></div>
        </div>
        <p class="text-zinc-400">Randomize the location of Caps and lowercase letters in words and quotes</p>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customCamelCase, selectedCustomizers, allCaps} = storeToRefs(store)

watch(customCamelCase, (newVal) => {
    selectedCustomizers.value[9] = newVal

    if (newVal && allCaps.value) {
        allCaps.value = false
    }
})
</script>