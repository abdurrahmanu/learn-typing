<template>
    <div id="focus" class="pt-4 mx-auto w-fit h-fit font-normal text-[14px]">        
        <div v-show="route.name == 'home' || route.name == 'result'" class="m-auto transition-all duration-100">
            <div v-show="isMobile()" @click="next" class="py-1 px-5 m-auto text-xs text-center border rounded-sm w-fit font-bold border-neutral-600">NEXT</div>
            <div v-show="!isMobile()" class="m-auto text-center cursor-default w-fit h-fit">Press <span @click="next" class="py-1 font-bold px-5 text-black rounded-md cursor-pointer bg-neutral-400 hover:bg-blue-600">{{ hasCompletedSession ? 'Enter' : 'Esc' }}</span> for next</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { useRouter, useRoute } from 'vue-router';
import { isMobile } from '../composables/isMobile';
import {nextStore} from '../store/nextStore'

const route = useRoute()
const router = useRouter()

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const store = mainStore()
const {hasCompletedSession} = storeToRefs(store)

window.addEventListener('keyup', event=> {
    if (event.key === 'Escape' && !hasCompletedSession.value) next()
    if (event.key === 'Enter' && hasCompletedSession.value) next()
})

const next = () => {
    goNext.value = true
    if (hasCompletedSession.value) router.push('/')
}
</script>