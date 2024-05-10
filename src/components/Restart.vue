<template>
    <div class="text-sm">
        <div v-if="getMobileOS()" class="m-auto space-y-2 text-base w-fit text-slate-500">
            <div v-if="hasStartedSession" @click="restart" class="p-1 m-auto text-center border rounded-md w-fit border-neutral-600">RESTART</div>
            <div @click="next" class="p-1 m-auto text-center border rounded-md w-fit border-neutral-600">NEXT</div>
        </div>
    
        <div v-else class="p-2 m-auto space-y-3 font-mono w-fit h-fit text-slate-500">
            <div v-if="hasStartedSession" class="text-center"><span @click="restart" class="p-1 text-xs rounded-md bg-neutral-800 hover:bg-blue-800 hover:text-white">Click to Restart</span></div>
            <div class="text-center">Press <span @click="next" class="p-1 text-xs rounded-md bg-neutral-800 hover:bg-blue-700 hover:text-white">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for NEXT</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { useRouter } from 'vue-router';
import { countdownStore } from '../store/countdownStore'

const router = useRouter()
const count = countdownStore()
const {clearCounter} = count
const store = mainStore()
const {switchNext, getMobileOS} = store
const { hasStartedSession, hasCompletedSession, timedTyping} = storeToRefs(store)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

window.addEventListener('keydown', event=> {
    if (event.key === 'Escape' && !hasCompletedSession.value) next()
    if (event.key === 'Enter' && hasCompletedSession.value) next()
})

const restart = () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart')
}

const next = () => {
    if (timedTyping.value) clearCounter()
    if (hasCompletedSession) {
        router.push('/')
    }
    switchNext(customizers.value)
}
</script>