<template>
    <div class="px-4 py-2 m-auto mt-10 rounded-md text-slate-400 bg-neutral-800 w-fit">
        <p class="pb-3 text-xs text-center"> NEXT</p>
        <div class="font-mono">
            <span>Press</span> <span class="p-1 rounded-md bg-zinc-700">Escape</span> <span>keys</span>
        </div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';

const {switchNext} = mainStore()
window.addEventListener('keydown', event=> {
    if (event.key === 'Escape') switchNext(event)
})
</script>

