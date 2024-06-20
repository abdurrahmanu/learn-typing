<template>
    <div v-show="!hasCompletedSession && completionLevel" :class="[getMobileOS() ? '' : 'border-b-[2px] border-white']" class="w-full max-w-[700px] absolute top-[100%] left-[50%] translate-x-[-50%]">
        <div :style="{'width': completionLevel + '%'}" class="bg-green-500 absolute left-0 top-0 bottom-0 h-[3px]"></div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';
import { getMobileOS } from '../composables/getMobileOS';
import { storeToRefs } from 'pinia';

const store = mainStore()
const { completionLevel, hasCompletedSession} = storeToRefs(store)
</script>