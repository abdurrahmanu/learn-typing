<template>
        <div class="p-2 px-1 border-t border-neutral-900 ">
            <div @click="typeBlindly = !typeBlindly" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
                <div class="flex gap-4">
                    <input :checked="typeBlindly"  type="checkbox" name="" id="">
                    <p>Blind mode</p>
                </div>
            </div>
            <p>How confident are you?  Type while fully trusting your muscle memory. </p>
        </div>

</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const main = customizeStore()
const { typeBlindly, customizers } = storeToRefs(main)
</script>
