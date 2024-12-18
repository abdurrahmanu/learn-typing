<template>
    <div v-if="!isMobileOS()" :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 gap-x-3 gap-y-1 font-[400]">
        <div class="py-1 text-xs font-medium">TEST LINES</div>
        <div class="flex flex-wrap gap-x-2 gap-y-1">
            <!-- <div @click="textLines = 1" class="flex px-5 py-1 border rounded-md" :class="[textLines === 1 ? 'border-green-500' : 'border-slate-500']">
                <p class="border w-fit border-slate-400">1</p>
            </div>
            <div @click="textLines = 2" class="flex px-5 py-1 border rounded-md" :class="[textLines === 2 ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit border-l-slate-500 ">2</p>
            </div> -->
            <div @click="textLines = 3" class="flex px-5 py-1 border rounded-md" :class="[textLines === 3 ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit">3</p>
            </div>
            <div @click="textLines = 4" class="flex px-5 py-1 border rounded-md" :class="[textLines === 4 ? 'border-green-500' : 'border-slate-500']" v-if="!isMobileOS()">
                <p class="w-fit ">4</p>
            </div>
            <div @click="textLines = 5" class="flex px-5 py-1 border rounded-md" :class="[textLines === 5 ? 'border-green-500' : 'border-slate-500']" v-if="!isMobileOS()">
                <p class="w-fit ">5</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import {updateDB} from '../../composables/updateDB'
import { isMobileOS } from '../../composables/isMobileOS';
import {textBoxHeight} from '../../composables/textBox'

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const { textLines } = storeToRefs(store)

watch(textLines, (newVal) => {
    let lines = newVal
    textBoxHeight()
    updateDB(Object.keys({lines})[0], lines, true)
})
</script>