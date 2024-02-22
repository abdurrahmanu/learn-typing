<template>
    <div class="px-4 py-2 m-auto mt-10 rounded-md text-slate-400 bg-neutral-800 w-fit">
        <p class="pb-3 text-xs text-center underline">{{startedTyping ? 'RESTART' : 'NEXT'}}</p>
        <div class="font-mono">
            <span>Press</span> <span class="p-1 border border-transparent rounded-md bg-zinc-700 hover:border-green-400">{{resultData.totalTime ? 'Enter' : 'Escape'}}</span> <span>key</span>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {switchNext} = store
const {resultData, startedTyping} = storeToRefs(store)

window.addEventListener('keydown', event=> {
    if (event.key === 'Escape' && !resultData.value.totalTime) switchNext()
    if (event.key === 'Enter' && resultData.value.totalTime) switchNext()
})
</script>