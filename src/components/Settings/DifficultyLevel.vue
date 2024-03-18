<template>
        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <p>Difficulty Level</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <div class=" text-slate-400 p-1">Select the Level that suits you</div>
            <div class="flex gap-5 p-1 text-xs m-auto justify-evenly">
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Easy</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Mid</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Expert</div>
            </div>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const main = mainStore()
const { enableBackSpace} = storeToRefs(main)

</script>