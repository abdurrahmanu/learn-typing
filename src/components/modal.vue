<template>
    <!-- <Teleport to="#modal-root">
        <Transition>           
            <div @click="toggleModal" v-if="toggle" class="fixed h-screen w-full top-0 left-0 bg-black opacity-40"></div>
        </Transition>
        <Transition name="content">
            <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] " v-if="toggle" >
                <div class="bg-blue-300 text-white place-content-center p-4 pt-8 rounded-md">
                    <div @click="toggleModal" class="absolute top-0 right-2">x</div>
                    <slot ></slot>
                </div>
            </div>
        </Transition>
    </Teleport> -->

    <!-- animated modal-->

    <Teleport to="#modal-root">
        <div @click="toggleModal" v-if="toggle" class="h-screen w-full absolute top-0 left-0">
            <Transition name="topLeft">                
                <div v-if="toggleWait" class=" w-[50%] h-[50%] absolute top-0 left-0 bg-black opacity-[.5]"></div>
            </Transition>
            <Transition name="topRight">                
                <div v-if="toggleWait" class="w-[50%] h-[50%] absolute top-0 right-0 bg-black opacity-[.5]"></div>
            </Transition>
            <Transition name="bottomLeft">                
                <div v-if="toggleWait" class="w-[50%] h-[50%] absolute left-0 bottom-0 bg-black opacity-[.5]"></div>
            </Transition>
            <Transition name="bottomRight">                
                <div v-if="toggleWait" class="w-[50%] h-[50%] absolute right-0 bottom-0 bg-black opacity-[.5]"></div>
            </Transition>
        </div>

        <Transition name="content" mode="out-in">
            <div class="fixed top-[40%] left-[50%] m-auto translate-x-[-50%] max-w-[500px] w-[60%] translate-y-[-50%]" v-if="toggleContent" >
                <div class="text-white relative m-auto h-fit place-content-center w-full p-4 pt-8 rounded-md">
                    <div @click="toggleModal" class="absolute top-0 right-2 px-2 rounded-full bg-zinc-800 text-gray-400">x</div>
                    <slot ></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount, watchEffect } from 'vue';

onBeforeMount(() => {
    const modalRoot = ref(document.createElement('div'))
    modalRoot.value.id = 'modal-root'
    document.body.appendChild(modalRoot.value)
})

const props = defineProps({
    toggle: Boolean
})

const toggleWait = ref(false)
const toggleContent = ref(false)

watchEffect(() => {
    if (props.toggle) {
        setTimeout(() => {
            toggleWait.value = true
            setTimeout(() => {
                toggleContent.value = true
            }, 1000);
        }, 0);
    } else {
        setTimeout(() => {
            toggleContent.value = false
            toggleWait.value = false
        }, 0);
    }
})

const emit = defineEmits(['false'])
const toggleModal = () => emit('false')
</script>

<style scoped>
.topLeft-enter-to,
.topRight-enter-to,
.bottomLeft-enter-to,
.bottomRight-enter-to {
    width: 50%;
    height: 50%;
} 

.topLeft-enter-from,
.topRight-enter-from,
.bottomLeft-enter-from,
.bottomRight-enter-from {
    width: 0;
    height: 0;
}

.topLeft-enter-active,
.topRight-enter-active,
.bottomLeft-enter-active,
.bottomRight-enter-active {
    transition: all;
    transition-duration: 1s;
}

.topLeft-leave-to,
.topRight-leave-to,
.bottomLeft-leave-to,
.bottomRight-leave-to {    
    width: 0;
    height: 0;
    bottom: 50%;
    right: 50%;
    top: 50%;
    left: 50%;
    background: #000;
    transform: translateX(-50%);
    transform: translateY(-50%);
}

.topLeft-leave-active,
.topRight-leave-active,
.bottomLeft-leave-active,
.bottomRight-leave-active {
    transition: all;
    transition-duration: 1s;
}

/* .v-enter-from {
    scale: 70%;
}

.v-enter-active {
    transition: scale .2s linear;
}

.content-leave-to {
    opacity: 30%;
}

.content-leave-active {
    transition: .1s linear;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    transition: all .3s linear;
} */
</style>

