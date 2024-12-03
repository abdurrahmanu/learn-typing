<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="customize"  class="gap-4 w-fit">
                    <input name="blind" :checked="blind"  type="checkbox" class="checked:accent-green-500 hover:accent-green-700" id="">
                    <label class="pl-3 text-sm font-medium w-fit">
                        <span>Blind mode</span>
                        <Blind class="relative inline-block px-2 top-1" />
                        <span v-if="!blind" class="px-3 text-white uppercase rounded-full text-[10px] bg-lime-800 ml-1 py-[1px] relative bottom-[2px]">easy</span>
                        <span v-else class="px-3 text-white uppercase rounded-full text-[10px] bg-yellow-800 ml-1 py-[1px] relative bottom-[2px]">medium</span>
                    </label>
                </div>
            </div>
            <p class="px-3 font-[400]">Toggle to type while fully trusting your muscle memory. </p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import Blind from '../Blind.vue';
import {customizeStore} from '../../store/customizeStore';
import {updateDB} from '../../composables/updateDB'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {blind} = storeToRefs(store)

const customize = () => {
    blind.value = !blind.value
    updateDB(Object.keys({blind})[0], blind.value)
}
</script>
