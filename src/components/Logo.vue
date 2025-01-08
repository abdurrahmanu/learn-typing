<template>
    <div class="relative cursor-default w-fit h-fit p-[1px]">
        <span class="absolute top-0 left-[50%] translate-x-[-50%] text-[11px] font-black pt-[2px]"><span class="hover:text-green-500">K</span><span class="hover:text-blue-500">I</span></span>
        <board class="w-7" :class="[isMobile() ? 'w-5' : 'w-']" />
    </div>
</template>

<script setup>
import board from './svg/board.vue'
import { isMobile } from '../composables/isMobile';
</script>



















































