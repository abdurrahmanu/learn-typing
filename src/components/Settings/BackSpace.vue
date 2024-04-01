<template>
        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="enableBackSpace" @click="enableBackSpace = !enableBackSpace" type="checkbox">
                    <p>Backspace</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">This enables or disables player ability to utilize the backspace key while typing.</p>
        </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const main = customizeStore()
const { enableBackSpace, selectedCustomizers} = storeToRefs(main)

watch(enableBackSpace, (newVal) => {
    selectedCustomizers.value[7] = newVal
})
</script>