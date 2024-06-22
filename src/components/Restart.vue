<template>
        <div v-if="route.name == 'home' || route.name == 'result'" class="pt-24 text-sm transition-all duration-100">
            <div v-if="getMobileOS()" class="m-auto space-y-2 text-base w-fit text-slate-500">
                <div v-if="!hasCompletedSession && playerInputLength" @click="restart" class="p-1 m-auto text-center border rounded-md w-fit border-neutral-600">RESTART</div>
                <div @click="next" class="p-1 m-auto text-center border rounded-md w-fit border-neutral-600">NEXT</div>
            </div>
            <div v-else class="m-auto space-y-6 font-mono w-fit h-fit text-slate-500">
                <div class="text-center cursor-default">Press <span @click="next" class="p-1 text-xs text-white rounded-md cursor-pointer bg-neutral-800 hover:bg-blue-700">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for NEXT</div>
                <div v-if="!hasCompletedSession && playerInputLength" class="text-center"><span @click="restart" class="p-1 text-xs text-white rounded-md cursor-pointer bg-neutral-800 hover:bg-blue-800 ">Click to Restart</span></div>
            </div>
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { useRouter, useRoute } from 'vue-router';
import { countdownStore } from '../store/countdownStore'
import { getMobileOS } from '../composables/getMobileOS';

const route = useRoute()
const router = useRouter()
const count = countdownStore()
const {clearCounter} = count
const store = mainStore()
const {switchNext} = store
const {hasCompletedSession, timedTyping, playerInputLength, containerText} = storeToRefs(store)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

window.addEventListener('keyup', event=> {
    if (event.key === 'Escape' && !hasCompletedSession.value) next()
    if (event.key === 'Enter' && hasCompletedSession.value) next()
})

const restart = () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart' )
}

const next = () => {
    containerText.value = ''
    if (timedTyping.value) clearCounter()
    if (hasCompletedSession.value) router.push('/')
    switchNext(customizers.value )
}
</script>