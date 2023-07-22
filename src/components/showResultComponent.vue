<template>
    <div class="text-white font-mono text-sm md:text-base lg:text-lg flex justify-center flex-wrap gap-3">
        <div>
            <div class="border p-1 rounded-md m-1 hover:bg-white hover:text-black">
                <div :class="[passBenchMark ? 'bg-green-300' : 'bg-red-300']"></div>
                Accuracy: {{ accuracy }}%
                </div>
            <div class="border p-1 rounded-md m-1  hover:bg-white hover:text-black">
                <div :class="[passBenchMark ? 'bg-green-300' : 'bg-red-300']"></div>
                Error ratio: {{wrongCount}} / {{props.wrongCount + props.correctCount}}
            </div>
        </div>
        <div>
            <div class="border p-1 rounded-md m-1  hover:bg-white hover:text-black">Time: {{ totalTypingTime }} seconds</div>
            <div class="border p-1 rounded-md m-1  hover:bg-white hover:text-black">Character per second: {{ charPerSecond }}</div>
        </div>
    </div>
</template>

<script setup>
import {defineEmits, defineProps, computed, watchEffect} from 'vue'

const emit = defineEmits([])
const props = defineProps({
    wrongCount: Number,
    correctCount: Number,
    startTime: Number,
    endTime: Number,
})

const totalTypingTime = (props.endTime - props.startTime) / 1000
const accuracy = 100 - ( ( (props.wrongCount / (props.wrongCount + props.correctCount)).toFixed(2) ) * 100)
const passBenchMark = (props.correctCount / (props.correctCount + props.wrongCount)) * 100 > 90

const charPerSecond = Math.ceil(props.correctCount / totalTypingTime)

</script>