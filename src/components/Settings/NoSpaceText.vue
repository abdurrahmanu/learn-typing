<template>
    <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
        <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
            <div class="flex gap-4">
                <input :checked="noSpace" @click="noSpace = !noSpace" type="checkbox">
                <p>NoSpace</p>
            </div>
            <div class="font-mono">></div>
        </div>
        <p class="text-zinc-400">Type without leaving space between words</p>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {noSpace, selectedCustomizers} = storeToRefs(store)

watch(noSpace, (newVal) => {
    selectedCustomizers.value[10] = newVal
})
</script>


















