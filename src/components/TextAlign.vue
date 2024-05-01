<template>
    <div class="flex gap-7 opacity-50 justify-center text-xs">
        <div >
            <p :class="[textPosition === 'left' ? 'rounded-md border-black' : 'border-transparent']" class="text-center border p-[2px]">LEFT</p>
            <div @click="$emit('align', 'left')" class="w-fit m-auto">
                <alignLeft />
            </div>
        </div>
        <div>
            <p :class="[textPosition === 'center' ? 'rounded-md border-black' : 'border-transparent']" class="text-center border p-[2px]">CENTER</p>
            <div  @click="$emit('align', 'center')" class="w-fit m-auto">
                <alignMiddle/>
            </div>
        </div>
        <div>
            <p :class="[textPosition === 'right' ? 'rounded-md border-black' : 'border-transparent']" class="text-center border p-[2px]">RIGHT</p>
            <div @click="$emit('align', 'right')" class="w-fit m-auto">
                <alignRight />
            </div>
        </div>
    </div>
</template>

<script setup>
import alignLeft from './svg/alignLeft.vue';
import alignMiddle from './svg/alignMiddle.vue';
import alignRight from './svg/alignRight.vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const { svgFill } = storeToRefs(main)
const props = defineProps({
    textPosition: String,
})
</script>