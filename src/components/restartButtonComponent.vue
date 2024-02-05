<template>
    <div class="absolute grid justify-center w-full gap-5 text-xs bottom-1">        
        <div class="w-full text-xs text-slate-300">
            <div class="px-4 py-2 m-auto rounded-md bg-neutral-800 w-fit">
                <p class="pb-3 text-xs text-center"> NEXT</p>
                <div class="font-mono">
                    <span>Press</span> <span class="p-1 rounded-md bg-zinc-700">Escape</span> <span>keys</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { typingStore } from '../store/typingStore';

const {switchNext} = typingStore()
window.addEventListener('keydown', event=> {
    if (event.key === 'Escape') switchNext(event)
})
</script>

