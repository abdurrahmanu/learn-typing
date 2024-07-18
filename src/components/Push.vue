<template>
    <div v-if="toggle" class="fixed w-[90%] max-w-[500px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div>
            <Transition name="width-increase">
                <div v-if="topLeft" class="bg-green-400 h-[3px] absolute left-0 w-[50%]"></div>
            </Transition>
            <Transition name="width-increase">
                <div v-if="topRigth" class="bg-red-500 h-[3px]  absolute right-0 w-[50%]"></div>
            </Transition>
        </div>
        <div class="m-auto font-sans text-sm lg:text-base">
            <slot />
        </div>
        <div>
            <Transition name="width-increase">
                <div v-if="bottomLeft" class="bg-green-400 h-[3px] absolute left-0 w-[50%]"></div>
            </Transition>
            <Transition name="width-increase">
                <div v-if="bottomLeft" class="bg-red-500 h-[3px] absolute right-0 w-[50%]"></div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const intervalId = ref(null)
const props = defineProps({
    toggle: Boolean
})

const emit = defineEmits(['false', 'go'])
const topLeft = ref(false)
const topRigth = ref(false)
const bottomLeft = ref(false)
const bottomRight = ref(false)

watchEffect(() => {
    if (props.toggle) {
        setTimeout(() => {            
            topLeft.value = true
            topRigth.value = true
            bottomLeft.value = true
            bottomRight.value = true
        }, 100);
        intervalId.value = setTimeout(() => {
            topLeft.value = false
            topRigth.value = false
            bottomLeft.value = false
            bottomRight.value = false
            emit('go')
            emit('false');
        }, 6000);
    } else {
        clearInterval(intervalId.value)
        topLeft.value = false
        topRigth.value = false
        bottomLeft.value = false
        bottomRight.value = false
    }
})

</script>

<style scoped>
.width-increase-enter-from {
    width: 0px;
}

.width-increase-enter-active {
    animation: move 6s ease;
}

@keyframes move {
    0% {
        width: 0px;
    };
    100% {
        width: 50%;
    }
}
</style>