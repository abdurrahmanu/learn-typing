<template>
    <div class="pt-20">
        <div v-if="getMobileOS()" class="w-fit m-auto text-slate-500 text-xl">
            <div v-if="!resultData.totalTime && hasStartedSession" @click="restart" class="w-fit m-auto text-center p-1">RESTART</div>
            <div @click="next" class="w-fit m-auto text-center p-1">NEXT</div>
        </div>
    
        <div v-else class="p-2 w-fit h-fit text-slate-500 space-y-3 m-auto font-mono">
            <div v-if="!resultData.totalTime && hasStartedSession" class="text-center">Press <span @click="restart" class="rounded-md p-1 text-xs bg-neutral-800 hover:bg-blue-700 hover:text-white"> ESCAPE</span> to RESTART</div>
            <div class="text-center">Press <span @click="next" class="rounded-md p-1 text-xs bg-neutral-800 hover:bg-blue-800 hover:text-white"> Ctrl + ESCAPE</span> for NEXT</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {switchNext, getMobileOS} = store
const {resultData, hasStartedSession} = storeToRefs(store)

window.addEventListener('keydown', event=> {
    if (event.key === 'Escape' && !resultData.value.totalTime) restart()
    if (event.key === 'Enter' && resultData.value.totalTime) restart()
})

const restart = () => {
    switchNext()
}

const next = () => {
    switchNext()
}
</script>