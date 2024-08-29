<template>
    <div class="fixed top-0 translate-x-[-50%] left-[50%] m-auto h-fit w-[90%] text-center perspective">
    <Transition appear mode="in-out" :name="transitionType">
            <span ref="toastEl" v-if="toggle" class="p-1 w-fit z-[4] shadow-sm min-w-[300px] shadow-black py-2 text-xs text-red-600 bg-slate-300 px-4 font-[500] max-w-[500px] inline-block" :class="{'top-0' : top, 'top-0 left-0' : left, 'top-[50px] right-[0]' : right, 'bottom-0 left-[50%] translate-x-[-50%]' : bottom}">
                {{ text }}
            </span>
        </Transition>
    </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue';

const transitionType = ref('')
const toastEl = ref(null)
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    toggle: {
        type: Boolean,
        default: false,
    },
    left: {
        type: Boolean,
        default: false,
    },
    right: {
        type: Boolean,
        default: false,
    },
    top: {
        type: Boolean,
        default: false,
    },
    bottom: {
        type: Boolean,
        default: false,
    },
    full: {
        type: Boolean,
        default: false
    }
})

watchEffect(() => {
    props.left ? transitionType.value = 'left' : 
    props.right ? transitionType.value = 'right' : 
    props.top ?  transitionType.value = 'top' : 
    props.bottom ?  transitionType.value = 'bottom' : 
    transitionType.value = 'left'
})
</script>

<style scoped>
.perspective {
    perspective: 80px;
}

/* ENTER */
.bottom-enter-from {
    transform: translateY(100%);
}

.left-enter-from {
    transform: translateX(-100%);
}

.right-enter-from {
    transform: translateX(100%);
}

.top-enter-from {
    transform: rotateX(90deg);
    transform-style: preserve-3d;
    opacity: 0;
    /* transform: translateY(-100%); */
}

/* LEAVE */

.bottom-leave-to {
    transform: translateY(100%);
}

.left-leave-to {
    transform: translateX(-100%);
}

.right-leave-to {
    transform: translateX(100%);
}

.top-leave-to {
    transform: rotateX(90deg);
    transform-style: preserve-3d;
    opacity: 0;
}

/* ENTER ACTIVE */

.left-enter-active, 
.top-enter-active,
.right-enter-active,
.auto-enter-active,
.bottom-enter-active {
    transition: all 0.4s ease;
}

/*  LEAVE ACTIVE */

.left-leave-active, 
.top-leave-active,
.right-leave-active,
.auto-leave-active,
.bottom-leave-active {
    transition: all 0.3s ease;
}

</style>
