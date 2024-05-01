<template>
        <div class="p-2 px-1 border-t border-neutral-900 ">
            <div @click="enableBackSpace = !enableBackSpace" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
                <div class="flex gap-4">
                    <input :checked="enableBackSpace"  type="checkbox">
                    <p>Backspace</p>
                </div>
            </div>
            <p> PC only, this enables or disables player ability to utilize the backspace key while typing.</p>
        </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const main = customizeStore()
const { enableBackSpace, customizers} = storeToRefs(main)

watch(enableBackSpace, (newVal) => {
    customizers.value['backspace'] = newVal
})
</script>