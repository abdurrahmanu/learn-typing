<template>
    <div ref="rangeEl" v-show="!hasCompletedSession && completionLevel"  class="max-w-[700px] m-auto">
        <div :style="{'width': completionLevel + '%'}" class="flex h-[2px]">
            <div v-show="index <= playerInput.length - 1" :class="[playerInput[index] === alphabet && index <= playerInput.length - 1 ? 'bg-green-500' : 'bg-red-500', ]" :style="{'width': singleDivWidth + 'px'}" v-for="(alphabet, index) in currentTest" :key="index"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue'
import { mainStore } from '../store/mainStore';
import { typingStateStore } from '../store/typingStateStore';
import { storeToRefs } from 'pinia';

const rangeEl = ref(null)
const singleDivWidth = ref(0)

const typingstatestore = typingStateStore()
const {completionLevel, playerInput} = storeToRefs(typingstatestore)

const store = mainStore()
const { hasCompletedSession, currentTest} = storeToRefs(store)

onMounted(() => {
    watchEffect(() => {
        if (currentTest.value.length) {
            const cssObject = getComputedStyle(rangeEl.value.parentElement)
            const width = +cssObject.getPropertyValue('width').slice(0, -2)
            singleDivWidth.value = +(width / currentTest.value.length).toFixed(2)
        }
    })
})
</script>