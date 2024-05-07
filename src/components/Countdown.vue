<template>
    <div v-if="start" :class="[theme === 'neutral' ? 'text-slate-400' : 'text-black']" class="text-[20px] font-bold max-w-fit m-auto">
        <Transition :name="animationName" mode="out-in">
            <div v-if="isNextCountDown" ref="countDownElement">{{ countdown }}</div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeMount } from 'vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import {countdownStore} from '../store/countdownStore'

const main = mainStore()
const {theme, savedCountdown} = storeToRefs(main)

const count = countdownStore()
const { animationName, countDownElement, isNextCountDown, timerID, intervalID, start, countdown} = storeToRefs(count)
const {clearCounter} = count

const emit = defineEmits(['stop'])
const props = defineProps({
    interval: Number,
    start: Boolean,
    length: Number,
    animate: Boolean,
    animationType: String,
    cancel: Boolean,
})

start.value = props.start

onMounted(() => {
    countdown.value = savedCountdown.value
    if (props.start) {
        if (props.animate) {
            if (countDownElement.value instanceof HTMLElement) {
                if (props.animationType) {
                    animationName.value = props.animationType.split(' ').join('-')
                } else {
                    const types = [
                        'slide-down',
                        'slide-up',
                        'slide-left',
                        'slide-right',
                        'slide-right-scale-down',
                        'slide-left-scale-down',
                        'slide-up-scale-down',
                        'slide-down-scale-down',
                        'slide-right-scale-up',
                        'slide-left-scale-up',
                        'slide-up-scale-up',
                        'slide-down-scale-up'
                    ]
                    let randomAnimation = Math.round(Math.random() * types.length - 1)
                    animationName.value = types[randomAnimation]
                }
            }
        }

        intervalID.value = setInterval(() => {
            if (props.animate) {
                isNextCountDown.value = false
                timerID.value = setTimeout(() => {
                    isNextCountDown.value = true
                }, 0);
            }
            countdown.value--
            if (countdown.value === 0) {
                clearCounter()
            } 
        }, props.interval)
    }
})

</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active, 
.slide-down-enter-active,
.slide-down-leave-active,
.scale-up-enter-active,
.scale-up-leave-active, 
.scale-down-enter-active,
.scale-down-leave-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-random-enter-active,
.slide-random-leave-active,
.slide-right-scale-up-enter-active,
.slide-right-scale-down-enter-active,
.slide-left-scale-up-enter-active,
.slide-left-scale-down-enter-active,
.slide-up-scale-up-enter-active,
.slide-up-scale-down-enter-active,
.slide-down-scale-up-enter-active,
.slide-down-scale-down-enter-active,
.slide-right-scale-up-leave-active,
.slide-right-scale-down-leave-active,
.slide-left-scale-up-leave-active,
.slide-left-scale-down-leave-active,
.slide-up-scale-up-leave-active,
.slide-up-scale-down-leave-active,
.slide-down-scale-up-leave-active,
.slide-down-scale-down-leave-active,
.slide-left-leave-active {
    transition: all .5s ease;
    scale: 1;
}

.slide-up-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

.slide-up-leave-to,
.slide-down-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-left-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.slide-left-leave-to,
.slide-right-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.scale-up-enter-from,
.scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
}

.scale-up-leave-to,
.scale-down-enter-from {
    scale: 1;
    opacity: 0;
}


.slide-down-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-down-scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
    transform: translateY(100%);
}

.slide-down-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-down-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-down-leave-to {
    scale: 0.3;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-up-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateY(-100%);
}

.slide-left-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-up-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-up-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-down-enter-from {
    scale: 0.4;
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-scale-down-leave-to {
    scale: 0.4;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-down-enter-from {
    scale: 0.3;
    opacity: 0;
    transform: translateX(-100%);
}

.slide-right-scale-down-leave-to {
    scale: 0.5;
    opacity: 0;
    transform: translateX(100%);
}

</style>

