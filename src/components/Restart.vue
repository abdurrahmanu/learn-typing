<template>
    <div class="">
        <div v-if="getMobileOS()" class="m-auto text-xl w-fit text-slate-500">
            <div v-if="!resultData.totalTime && hasStartedSession" @click="restart" class="p-1 m-auto text-center w-fit">RESTART</div>
            <div @click="next" class="p-1 m-auto text-center w-fit">NEXT</div>
        </div>
    
        <div v-else class="p-2 m-auto space-y-3 font-mono w-fit h-fit text-slate-500">
            <div v-if="!resultData.totalTime && hasStartedSession" class="text-center"><span @click="restart" class="p-1 text-xs rounded-md bg-neutral-800 hover:bg-blue-800 hover:text-white">Click to Restart</span></div>
            <div class="text-center">Press <span @click="next" class="p-1 text-xs rounded-md bg-neutral-800 hover:bg-blue-700 hover:text-white"> Esc</span> for NEXT</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';

const store = mainStore()
const {switchNext, getMobileOS} = store
const {resultData, hasStartedSession} = storeToRefs(store)

const customize = customizeStore()
const { config} = storeToRefs(customize)

window.addEventListener('keydown', event=> {
    if (event.key === 'Escape' && !resultData.value.totalTime) next()
    if (event.key === 'Enter' && resultData.value.totalTime) next()
})

const restart = () => {
    switchNext(config.value, 'restart')
}

const next = () => {
    switchNext(config.value)
}
</script>