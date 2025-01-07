<template>
    <div class="fixed m-auto max-w-[1500px] flex items-center gap-3 bottom-2 pr-2 w-full justify-end">      
        <SwitchModes :class="[demo ? 'opacity-0 hidden' : '']" class="self-end mb-[2px] transition-all duration-300" />
        <Theme class="self-end"/>
    </div>
</template>

<script setup>
import SwitchModes from './SwitchModes.vue'
import Theme from './Theme.vue'
import {mainStore} from '../store/mainStore'
import {storeToRefs} from 'pinia'

const main = mainStore()
const { demo } = storeToRefs(main)
</script>
