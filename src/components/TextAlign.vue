<template>
    <div  v-if="!getMobileOS() && !alphabetsMode_" class="flex justify-center mx-auto text-xs cursor-pointer gap-3 w-fit max-[500px]:hidden">
        <div @click="textPosition = 'left'">
            <alignLeft :position="textPosition === 'left'" class="w-5" />
        </div>
        <div  @click="textPosition = 'center'">
            <alignMiddle :position="textPosition === 'center'" class="w-5"/>
        </div>
        <div @click="textPosition = 'right'">
            <alignRight :position="textPosition === 'right'" class="w-5"/>
        </div>
    </div>
</template>

<script setup>
import alignLeft from './svg/alignLeft.vue';
import alignMiddle from './svg/alignMiddle.vue';
import alignRight from './svg/alignRight.vue';
import {storeToRefs} from 'pinia'
import {alphabetsStore}  from '../store/alphabetsModeStore'
import { getMobileOS } from '../composables/getMobileOS';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {textPosition} = storeToRefs(store)

const alphabets = alphabetsStore()
const {alphabetsMode_ } = storeToRefs(alphabets)
</script>