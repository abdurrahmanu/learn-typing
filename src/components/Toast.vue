<template>
    <Transition appear mode="in-out" :name="transitionType">
        <div ref="toastEl" v-if="toast" class="fixed p-1 w-fit z-[4] bg-red-500 shadow-sm shadow-black text-white" :class="{'top-0 left-[50%] translate-x-[-50%]' : top, 'top-0 left-[0]' : left, 'top-[50px] right-[0]' : right, 'bottom-0 left-[50%] translate-x-[-50%]' : bottom}">
            {{ text }}
        </div>
    </Transition>
</template>

<script setup>
import { watchEffect, ref } from 'vue';

const toast = ref(false)
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

watchEffect(() => {
    if (props.toggle) {
        toast.value = true
        setTimeout(() => {
            toast.value = false
        }, 3000);
    } else {
        toast.value = false
    }
})
</script>


<style scoped>
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
    transform: translateY(-100%);
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
    transform: translateY(-100%);
}

/* ENTER ACTIVE */

.left-enter-active, 
.top-enter-active,
.right-enter-active,
.auto-enter-active,
.bottom-enter-active {
    transition: all 0.3s ease;
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
