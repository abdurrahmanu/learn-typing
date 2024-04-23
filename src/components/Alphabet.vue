<template>
    <div :class="[noSpace ? '' : 'whitespace-pre-wrap']" class="relative inline font-mono">
        <Transition v-if="currentIndex" appear>            
            <span :class="[equalStyle, currentIndexStyle, mainStyle, styledAlphas]" class="transition-all duration-[10ms]">{{ alphabet }}</span>
        </Transition>
        <span v-else :class="[equalStyle, currentIndexStyle, mainStyle, styledAlphas]" class="transition-all duration-[10ms]">{{ alphabet }}</span>
    </div>
</template> 

<script setup>
import { defineProps, computed } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore';

const store = mainStore()
const { playerInputLength, alphabets, alphabetsMode } = storeToRefs(store)

const customize = customizeStore()
const {typeBlindly, noSpace} = storeToRefs(customize)
const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
})

const equalStyle = computed(() => {
    if (!typeBlindly.value) {
        return props.equality ? 'text-green-300' : 'text-red-500'
    }
})

const styledAlphas = computed(() => {
    if (alphabets.value && alphabetsMode.value.styled) {
        return 'border border-slate-500 bg-zinc-900 rounded-md p-1'
    }
})

const currentIndexStyle = computed(() => {
    return  props.currentIndex ? 'bg-zinc-700 text-white py-[2px] animate-pulse' : ''
})

const mainStyle = computed(() => {
    return props.index > playerInputLength.value ? 'text-slate-500' : ''
})
</script>

<style scoped>
.v-enter-from {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: all .5s ease-in;
}
</style>
