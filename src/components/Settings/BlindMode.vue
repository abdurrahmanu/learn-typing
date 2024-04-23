<template>
        <div class="p-2 px-1 border-t border-neutral-900 hover:bg-neutral-900">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300">
                <div class="flex gap-4">
                    <input :checked="typeBlindly" @click="typeBlindly = !typeBlindly" type="checkbox" name="" id="">
                    <p>Blind mode</p>
                </div>
            </div>
            <p class="text-zinc-400">How confident are you?  Instead of depending on colors, Type while fully trusting your muscle memory to tell you when you have typed wrongly. </p>
        </div>

</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const main = customizeStore()
const { typeBlindly, customizers } = storeToRefs(main)

watch(typeBlindly, (newVal) => {
    customizers.value['blind-mode'] = newVal
})

</script>
