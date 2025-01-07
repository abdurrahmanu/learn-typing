<template>
    <div class="pt-4 mx-auto w-fit h-fit font-[400] text-[15px]">        
        <div ref="restartEl" v-show="route.name == 'home' || route.name == 'result'" class="m-auto transition-all duration-100">
            <div v-show="isMobile()" @click="next" class="p-[4px] m-auto text-xs text-center border rounded-sm w-fit border-neutral-600">NEXT</div>
            <div v-show="!isMobile()" class="m-auto text-center cursor-default w-fit h-fit">Press <span @click="next" class="p-[2px] px-2 text-black rounded-sm cursor-pointer bg-neutral-400 hover:bg-green-600">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for next</div>
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