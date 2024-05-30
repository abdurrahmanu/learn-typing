<template>
    <div class="p-2 px-1 border-t border-neutral-900 ">
        <div  @click="customize('custom-camel-case', !customizers['custom-camel-case'])"  class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 ">
            <div class="flex gap-4">
                <input name="camelcase" :checked="customizers['custom-camel-case']" type="checkbox">
                <p>CusTOm cAMeL caSE</p>
            </div>
        </div>
        <p class="px-3">Randomize the location of Caps and lowercase letters in tests</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>