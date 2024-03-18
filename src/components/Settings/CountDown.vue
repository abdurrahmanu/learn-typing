<template>
        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="timedTyping" @click="timedTyping = !timedTyping" type="checkbox">
                    <p>Countdown Typing</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">With countdown enabled, tests automatically end at the end of countdown, untyped alphabets are considered as errors</p>
        </div>

</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const main = mainStore()
const { timedTyping} = storeToRefs(main)


</script>