<template>
        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="typeBlindly" @click="typeBlindly = !typeBlindly" type="checkbox" name="" id="">
                    <p>Blind mode</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">How confident are you?  Instead of depending on red-color / green-color inputs, Type while fully trusting your muscle memory to tell you when you have typed wrongly. </p>
        </div>

</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const main = customizeStore()
const { typeBlindly, selectedCustomizers } = storeToRefs(main)

watch(typeBlindly, (newVal) => {
    selectedCustomizers.value[8] = newVal
})

</script>
