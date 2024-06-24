<template>
    <div ref="rangeEl" v-show="!hasCompletedSession && completionLevel" :class="[isMobileOS() ? '' : '']" class="w-full max-w-[700px] absolute top-[100%] left-[50%] translate-x-[-50%]">
        <div :style="{'width': completionLevel + '%'}" class="flex">
            <div v-show="index <= playerInput.length - 1" :class="[playerInput[index] === alphabet && index <= playerInput.length - 1 ? 'bg-green-500' : 'bg-red-500', ]" class="h-[3px]" :style="{'width': singleDivWidth + 'px'}" v-for="(alphabet, index) in containerText" :key="index"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, watchEffect, computed} from 'vue'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { isMobileOS } from '../composables/isMobileOS';

const rangeEl = ref(null)
const singleDivWidth = ref(0)
const store = mainStore()
const { completionLevel, hasCompletedSession, containerText, playerInput} = storeToRefs(store)

onMounted(() => {
    watchEffect(() => {
        if (containerText.value.length) {
            const cssObject = getComputedStyle(rangeEl.value.parentElement)
            const width = +cssObject.getPropertyValue('width').slice(0, -2)
            singleDivWidth.value = +(width / containerText.value.length).toFixed(2)
        }
    })
})
</script>