<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-4 w-fit">
                <input name="caps" :checked="doubleEachWord" type="checkbox" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-sm font-medium w-fit">
                    <span>Double each word</span>
                    <span v-if="doubleEachWord" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                    <span v-else-if="!doubleEachWord" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to repeat every word twice. Can only work with spaced test.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { mainStore } from '../../store/mainStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers, doubleEachWord} = storeToRefs(store)

const main = mainStore()
const {switchNext} = main

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const customize = () => {
    doubleEachWord.value = !doubleEachWord.value
    localStorageSettings.value.doubleEachWord = doubleEachWord.value
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
    
    switchNext(customizers.value)
}
</script>
