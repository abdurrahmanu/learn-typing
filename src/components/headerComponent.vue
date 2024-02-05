<template>
    <section class="relative h-fit">
        <nav class="fixed top-0 left-0 flex justify-around w-full p-3 font-mono text-slate-300 opacity-90">
            <div class="flex items-center gap-5 font-mono">
                <div class="text-xl md:text-2xl">DORAYI TYPING</div>
            </div>
            <div class="flex gap-3">
                <div>00</div>
                <div>00</div>
                <div>00</div>
            </div>
        </nav>

        <div class="text-[10px] mt-4 font-mono md:max-w-[1000px] items-center w-[90%] bg-neutral-800 text-slate-200 rounded-md p-1 flex max-w-[500px] justify-center m-auto flex-wrap">
            
            <div class="px-1 py-[2px]" v-for="(optionArr, index) in options" :key="index">
                <div 
                @mouseenter="mouseEnter(index)"
                @mouseleave="mouseLeave(index)"
                :class="[hoverIndex === index ? 'border-white border-opacity-40 rounded-lg' : 'border-transparent']"
                class="py-[4px] border rounded-3xl relative px-[2px] border-opacity-25 flex gap-2">
                    <div 
                    class="px-1 md:text-[12px] hover:bg-neutral-900"
                    @click="selectedOption(option)"
                    :class="[selections.indexOf(option) > -1 ? 'text-green-400 bg-neutral-900' : '']" 
                    v-for="(option, index) in optionArr" 
                    :key="index">
                        {{ option }}
                    </div>
                    <div v-if="index === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-300 rounded-full">{{tooltip[index]}}</div>
                </div>
            </div>
            
            <Modal @false="openModal = false" :toggle="openModal">
                <searchBar />
            </Modal>
            <SearchSvg @click="openModal = true" class="w-4 h-4 absolute bottom-[5px] right-[30px]" />
        </div>
    </section>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import SearchSvg from './svgComponents/SearchSvg.vue'
import Modal from './modal.vue'
import searchBar from './searchBar.vue'

import {typingStore} from '../store/typingStore.js'
import {storeToRefs} from 'pinia'
const store = typingStore()
const {customizeProp} = storeToRefs(store)
const {checkConfiguration } = store

const tooltip = ['random', 'length', 'word', 'format', 'format', 'word', 'word']
const options = [
    ['custom', 'centralize'],
    ['auto', 'short', 'long', '10', '20', '30', '45'],
    ['most-used', 'seldom-used', 'rarely-used'],
    ['caps'],
    ['punctuations'],
    ['numbers'],
    ['quotes', 'random']
]

const openModal = ref(false)
const hoverIndex = ref(null)
const selections = ref([])
const emit = defineEmits([ 'emitTextAlign']) 

const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const selectedOption = (selectedOpt) => {
    checkConfiguration(selectedOpt)
    if (selectedOpt === 'centralize') {
        emit('emitTextAlign');
    }

    if (selections.value.indexOf(selectedOpt) !== -1) {
        selections.value = selections.value.filter(option => option !== selectedOpt);
    } else {
        for (let i = 0; i < options.length; i++) {
            if (options[i].find(each => each.includes(selectedOpt))) {
                selections.value[i] = selectedOpt
            }
        } 
    }
    customizeProp(selections.value)
}



</script>