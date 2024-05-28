<template>
    <Transition appear name="sidebar" mode="out-in">
        <div v-if="toggleSidebar" :class="[appTheme]" class="w-fit max-w-[200px] fixed top-[0%] left-0 h-fit shadow-sm shadow-black z-[999999]">
            <p @click="toggleSidebar = false"  class="font-cursive text-red-900 shadow-sm shadow-black px-3 bg-inherit font-bold hover:text-red-600 text-xl text-right p-1 rounded-r-full rounded-l-none absolute  top-[50%] translate-y-[-50%] left-[100%] z-[99999]"><span>X</span></p>
            <div>
                <div class="px-8 py-3 text-sm text-center border-b border-b-transparent hover:border-b-slate-500" v-for="(option, index) in options" :key="index">{{ option }}</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {mainStore} from './../store/mainStore'

const main = mainStore()
const { toggleSidebar, appTheme } = storeToRefs(main)
const options = ['Logout', 'My Progress']
</script>

<style scoped>
.sidebar-enter-from  {
    transform: translateX(-100%)
}

.sidebar-leave-to {
    transform: translateX(-100%)
}

.sidebar-enter-active,
.sidebar-leave-active {
    transition: all;
    transition-duration: 0.5s;
}
</style>


