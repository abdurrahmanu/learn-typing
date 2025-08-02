<template>
    <div id="focus" class="mx-auto w-fit" v-if="homeOrResultRoute">        
        <div v-if="isMobile()" @click="next" class="next">NEXT</div>
        <div v-else class="m-auto w-fit">Press <span @click="next" class="next">{{ testCompleted ? 'Enter' : 'Esc' }}</span> for next</div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';
import { isMobile } from '../composables/isMobile';
import {nextStore} from '../store/nextStore'
import useWatchers from '../composables/useWatchers';
import { computed } from 'vue';
import { typingStateStore } from '../store/typingStateStore';

const typingstatestore = typingStateStore()
const {testCompleted} = storeToRefs(typingstatestore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { route} = storeToRefs(mainstore)

window.addEventListener('keydown', event => {
    if (event.key === 'Enter' && testCompleted.value) {
        next()
    }
})

const next = () => {
    goNext.value = true
}

const homeOrResultRoute = computed(() => {
    return route.value == 'home' || route.value == 'result'
})

useWatchers({ goNext })
</script> 

<style scoped>
.next {
    @apply py-1 px-5 m-auto text-xs text-center border rounded-sm w-fit font-bold border-neutral-600
}
</style>