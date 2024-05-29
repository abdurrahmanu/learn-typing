<template>
    <div class="flex justify-center mx-auto text-xs scale-90 opacity-50 cursor-pointer gap-7 w-fit">
        <div @click="$emit('align', 'left'), position = 'left'" class="m-auto scale-75 w-fit">
            <alignLeft :position="position === 'left'"/>
        </div>
        <div  @click="$emit('align', 'center'), position = 'center'" class="m-auto scale-75 w-fit">
            <alignMiddle :position="position === 'center'"/>
        </div>
        <div @click="$emit('align', 'right'), position = 'right'" class="m-auto scale-75 w-fit">
            <alignRight :position="position === 'right'" />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import alignLeft from './svg/alignLeft.vue';
import alignMiddle from './svg/alignMiddle.vue';
import alignRight from './svg/alignRight.vue';

const position = ref('left')
const props = defineProps({
    textPosition: String,
})
</script>