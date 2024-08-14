<template>
    <div class="pt-4 mx-auto w-fit h-fit font-[400]">        
        <div ref="restartEl" v-show="route.name == 'home' || route.name == 'result'" class="m-auto text-sm transition-all duration-100 text-neutral-500">
            <div v-show="isMobileOS()" @click="next" class="p-1 m-auto text-base text-center border rounded-md w-fit border-neutral-600">NEXT</div>
            <div v-show="!isMobileOS()" class="m-auto text-center cursor-default w-fit h-fit">Press <span @click="next" class="p-1 px-3 text-xs text-white rounded-md cursor-pointer bg-neutral-800 hover:bg-green-600">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for NEXT</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { useRouter, useRoute } from 'vue-router';
import { countdownStore } from '../store/countdownStore'
import { isMobileOS } from '../composables/isMobileOS';

const route = useRoute()
const router = useRouter()
const count = countdownStore()
const {clearCounter} = count
const store = mainStore()
const {switchNext} = store
const {hasCompletedSession, savedCountdown, timedTyping, restartEl, containerText} = storeToRefs(store)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

window.addEventListener('keyup', event=> {
    if (event.key === 'Escape' && !hasCompletedSession.value) next()
    if (event.key === 'Enter' && hasCompletedSession.value) next()
})

const next = () => {
    containerText.value = ''
    if (timedTyping.value) clearCounter()
    if (hasCompletedSession.value) router.push('/')
    switchNext(customizers.value)
}
</script>