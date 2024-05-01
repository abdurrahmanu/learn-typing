<template>
    <div class="p-2 px-1 border-t border-neutral-900 ">
        <div  @click="customCamelCase = !customCamelCase"  class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 ">
            <div class="flex gap-4">
                <input :checked="customCamelCase" type="checkbox">
                <p>CusTOm cAMeL caSE</p>
            </div>
        </div>
        <p>Randomize the location of Caps and lowercase letters in words and quotes</p>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customCamelCase, customizers, allCaps} = storeToRefs(store)

watch(customCamelCase, (newVal) => {
    customizers.value['custom-camel-case'] = newVal

    if (newVal && allCaps.value) {
        allCaps.value = false
    }
})
</script>