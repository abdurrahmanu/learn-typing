<template>
    <div :class="appTheme" class="w-fit">
        <Transition name="slide-left" mode="out-in">
            <div v-if="isNextCountDown" ref="countDownElement">{{ countdown }}s </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import {countdownStore} from '../store/countdownStore'
import {themeStore}  from '../store/themeStore'

const theme_ = themeStore()
const {appTheme } = storeToRefs(theme_)

const count = countdownStore()
const { countDownElement, isNextCountDown, timerID, intervalID, countdown} = storeToRefs(count)
const {clearCounter} = count

const props = defineProps({
    start: Boolean,
    length: Number,
})

onMounted(() => {
    if (props.start) {
        intervalID.value = setInterval(() => {
            isNextCountDown.value = false
            timerID.value = setTimeout(() => isNextCountDown.value = true , 0);
        
            countdown.value--
            if (countdown.value === 0) clearCounter()
        }, 1000)
    }
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all .3s ease;
}

.slide-left-enter-from {
    transform: translateX(30%);
    opacity: .6;
}

.slide-left-leave-to {
    opacity: 0;
}
</style>