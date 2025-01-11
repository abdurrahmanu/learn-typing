<template>
    <div class="pt-4 mx-auto w-fit h-fit font-normal text-[14px]">        
        <div ref="restartEl" v-show="route.name == 'home' || route.name == 'result'" class="m-auto transition-all duration-100">
            <div v-show="isMobile()" @click="next" class="py-1 px-5 m-auto text-xs text-center border rounded-sm w-fit font-bold border-neutral-600">NEXT</div>
            <div v-show="!isMobile()" class="m-auto text-center cursor-default w-fit h-fit">Press <span @click="next" class="py-1 font-bold px-5 text-black rounded-md cursor-pointer bg-neutral-400 hover:bg-blue-600">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for next</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { customizeStore } from '../store/customizeStore';
import { useRouter, useRoute } from 'vue-router';
import { countdownStore } from '../store/countdownStore'
import { isMobile } from '../composables/isMobile';

const route = useRoute()
const router = useRouter()
const count = countdownStore()
const {clearCounter} = count
const store = mainStore()
const {switchNext} = store
const {hasCompletedSession, timedTyping, restartEl, containerText} = storeToRefs(store)

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