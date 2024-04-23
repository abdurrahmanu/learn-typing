<template>
        <div class="p-2 px-1 border-t border-neutral-900 hover:bg-neutral-900">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300">
                <div class="flex gap-4">
                    <p>Difficulty Level</p>
                </div>
            </div>
            <div class="p-1  text-slate-400">Select the Level that suits you</div>
            <div class="flex gap-5 p-1 m-auto text-xs justify-evenly">
                <div class="p-1 px-3 font-mono text-white rounded-md bg-zinc-700 hover:bg-neutral-700">Easy</div>
                <div class="p-1 px-3 font-mono text-white rounded-md bg-zinc-700 hover:bg-neutral-700">Mid</div>
                <div class="p-1 px-3 font-mono text-white rounded-md bg-zinc-700 hover:bg-neutral-700">Expert</div>
            </div>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const main = mainStore()
const { enableBackSpace} = storeToRefs(main)

</script>