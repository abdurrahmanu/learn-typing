<template>
    <div class="text-center w-fit m-auto pt-10">
        <div class="text-2xl font-mono text-slate-300">TIME</div>
        <div>
            <span class="text-3xl font-mono">{{ totalTypingTime < 59 ? `00` : minutes++ }}</span>
            <span class="text-3xl font-mono">:</span>
            <span class="text-3xl font-mono">{{ totalTypingTime < 10 ? `0${totalTypingTime}` : totalTypingTime }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const minutes = ref(0)

const props = defineProps({
    startTime: Number,
    endTime: Number,
})

const totalTypingTime = Math.round((props.endTime - props.startTime) / 1000)


</script>