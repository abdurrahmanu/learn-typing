<template>
    <div class="p-2 px-1 border-t border-neutral-900">
        <div @click="noSpace = !noSpace" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 ">
            <div class="flex gap-4">
                <input :checked="noSpace" type="checkbox">
                <p>NoSpace</p>
            </div>
        </div>
        <p>Type without leaving space between words</p>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {noSpace, customizers} = storeToRefs(store)

watch(noSpace, (newVal) => {
    customizers.value['no-space'] = newVal
})
</script>


















