<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="customize"  class="flex gap-4 w-fit">
                    <input name="blind" :checked="customizers['blind-mode']"  type="checkbox" id="">
                    <p class="font-medium w-fit">Blind mode</p>
                </div>
            </div>
            <p class="px-3">Type while fully trusting your muscle memory. </p>
        </div>

</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const { customizers, disableOption } = storeToRefs(store)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']
    localStorageSettings.value.config = [customizers.value, disableOption.value]
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
}
</script>
