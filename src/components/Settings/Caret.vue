<template>
    <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="py-2 font-medium text-sm">SELECT CARET TYPE</div>
        <div class="space-x-3 flex">
            <div class="flex border border-slate-500 px-5 py-1 gap-2">
                <input name="caret" v-model="caretType" value="border" type="radio">
                <p class="w-fit border border-slate-400">A</p>
            </div>
            <div class="flex border border-slate-500 px-5 py-1 gap-2">
                <input name="caret" v-model="caretType" value="caret" type="radio">
                <p class="w-fit border border-transparent border-l-slate-500 ">A</p>
            </div>
            <div class="flex border border-slate-500 px-5 py-1 gap-2">
                <input name="caret" v-model="caretType" value="underline" type="radio">
                <p class="w-fit border border-transparent border-b-blue-500">A</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const { caretType} = storeToRefs(store)

watch(caretType, (newVal) => {
    localStorage.setItem('dorayi-typing-preferred-caret', caretType.value)
})
</script>