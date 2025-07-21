<template>
    <div class="flex justify-center mx-auto cursor-pointer gap-3 w-fit max-[500px]:hidden">
        <div @click="textPosition = 'left'">
            <alignLeft :position="textPosition === 'left'" class="w-5" />
        </div>
        <div  @click="textPosition = 'left'">
            <alignJustify :position="textPosition === 'left'" class="w-5"/>
        </div>
    </div>
</template>

<script setup>
import alignLeft from './svg/alignLeft.vue';
import alignJustify from './svg/alignJustify.vue';
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';

const customize = customizeStore()
const {textPosition} = storeToRefs(customize)
</script>