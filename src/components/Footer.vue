<template>
    <div class="fixed flex items-center gap-3 bottom-2 right-2">      
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
