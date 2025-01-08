<template>
    <div class="fixed left-[50%] translate-x-[-50%] m-auto max-w-[1500px] flex items-center gap-3 bottom-2 pr-2 w-fit">      
        <SwitchModes :class="[demo ? 'opacity-0 hidden' : '']" class=" mb-[2px] transition-all duration-300" />
        <Theme/>
    </div>
</template>

<script setup>
import SwitchModes from './SwitchModes.vue'
import {mainStore} from '../store/mainStore'
import {storeToRefs} from 'pinia'
import Theme from './Theme.vue'

const main = mainStore()
const { demo } = storeToRefs(main)
</script>
