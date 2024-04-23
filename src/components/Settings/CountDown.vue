<template>
        <div class="p-2 px-1 border-t border-neutral-900 hover:bg-neutral-900">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300">
                <div class="flex gap-4">
                    <input :checked="timedTyping" @click="timedTyping = !timedTyping" type="checkbox">
                    <p>Countdown Typing</p>
                </div>
            </div>
            <p class="text-zinc-400">With countdown enabled, tests automatically end at the end of countdown, untyped alphabets are considered as errors</p>
        </div>

</template>

<script setup>
import { watch } from 'vue';
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';
import {customizeStore} from '../../store/customizeStore'

const main = mainStore()
const { timedTyping} = storeToRefs(main)


</script>