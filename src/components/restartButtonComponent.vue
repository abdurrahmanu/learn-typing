<template>
    <div class="flex w-full text-slate-300 transition duration-75">
        <div class="bg-neutral-800 w-fit px-4 p-2 rounded-md m-auto">
            <p class="text-center py-2"> NEXT</p>
            <div class="font-mono">
                <span>Press</span> <span class="bg-slate-600 text-[10px] font-mono p-1 rounded-md m-1">Escape</span> <span>keys</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['EscapeToNextSession'])
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        emit ('EscapeToNextSession')
    }
})

</script>

