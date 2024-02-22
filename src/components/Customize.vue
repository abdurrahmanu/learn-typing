<template>
    <div class="text-[10px] font-mono items-center w-[90%] bg-neutral-800 text-slate-300 rounded-md p-2 flex max-w-[650px] justify-center m-auto flex-wrap mt-5">
        <div class="p-1" v-for="(optionArr, listIndex) in options" :key="listIndex">
            
            <div 
            :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-1 border rounded-lg"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" >
                <div class="px-1 hover:bg-neutral-900" :class="[ selectedCustomizers[listIndex] === option ? 'text-green-400 bg-neutral-900' : '']"
                @click="configure(option, listIndex)" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }} 
                </div>
                
                <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-100 rounded-full">{{tooltip[listIndex]}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import { mainStore } from '../store/mainStore';
import {storeToRefs} from 'pinia'

const store = customizeStore()
const {selectedCustomizers} = storeToRefs(store)
const {changeConfiguration } = store

const main = mainStore()
const {config} = storeToRefs(main)

const tooltip = ['length', 'word', 'format', 'format', 'word', 'word']
const options = [
    ['auto', 'short', 'long', '10', '20', '30', '45'],
    ['most-used', 'seldom-used', 'rarely-used'],
    ['quotes', 'random-text'],
    ['caps'],
    ['punctuations'],
    ['numbers'],
]

const hoverIndex = ref(null)
const emit = defineEmits([ 'emitTextAlign']) 

const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const configure = (selectedOpt, listIndex) => {
    changeConfiguration(selectedOpt, listIndex)
    config.value = selectedCustomizers.value
}
</script>