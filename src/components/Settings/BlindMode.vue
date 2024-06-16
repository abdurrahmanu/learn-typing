<template>
        <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
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
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const { customizers, disableOption } = storeToRefs(store)

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']
    localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
}
</script>
