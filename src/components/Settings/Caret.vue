<template>
    <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-4 pl-5 flex items-center flex-wrap gap-5">
        <div class="py-2 font-medium text-sm">CARET</div>
        <div class="space-x-3 flex">
            <div @click="caretType = 'border'" class="flex border px-5 rounded-md py-1 gap-2" :class="[caretType === 'border' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit border border-slate-400">A</p>
            </div>
            <div @click="caretType = 'caret'" class="flex border px-5 rounded-md py-1 gap-2" :class="[caretType === 'caret' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit border border-transparent border-l-slate-500 ">A</p>
            </div>
            <div @click="caretType = 'underline'" class="flex border px-5 rounded-md py-1 gap-2" :class="[caretType === 'underline' ? 'border-green-500' : 'border-slate-500']">
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