<template>
        <div class="p-2 px-1 border-t border-neutral-900 ">
            <div @click="timedTyping = !timedTyping" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 ">
                <div class="flex gap-4">
                    <input name="countdown" :checked="timedTyping" type="checkbox">
                    <p>Countdown Typing</p>
                </div>
            </div>
            <p class="px-3">Play with countdown, tests automatically end at the end of countdown, untyped alphabets are considered as errors</p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const main = mainStore()
const { timedTyping} = storeToRefs(main)
</script>