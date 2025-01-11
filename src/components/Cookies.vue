<template>
    <div class="overflow-y-auto outline-none"  :class="[cookiesModal ? 'fixed top-0 right-0 bottom-0 left-0 h-[100dvh] z-[999] opacity-40 bg-neutral-900' : '',]"></div>
    <Transition name="zoom">
        <div v-if="cookiesModal" class="fixed p-3 m-auto rounded-sm w-[500px] max-w-[90%] bg-black text-slate-300 space-y-3 text-sm left-[50%] translate-x-[-50%] z-[9999] top-[40%] translate-y-[-50%] rounded-br-[20px]">
            <p class="text-sm text-center">Allow this site to save your preferred settings to enhance your user experience.</p>
            <div class="flex justify-center hover:text-white">
                <div @click="acceptCookies" class="px-4 ring-[1px] hover:ring-green-700 hover:bg-green-700 py-1 whitespace-nowrap">ALLOW</div>
                <div @click="rejectCookies" class="px-4 ring-[1px] hover:bg-red-500 py-1 whitespace-nowrap hover:ring-red-500">REJECT</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import {watch} from 'vue'
import { customizeStore } from '../store/customizeStore';
import {cookiesStore} from '../store/cookiesStore'
import { storeToRefs } from 'pinia';
import {addSingleDoc} from '../composables/firestoreDocs'

const cookies = cookiesStore()
const {cookiesModal, acceptedCookies, saveConfigs} = storeToRefs(cookies)

const customize = customizeStore()
const { pauseTyping} = storeToRefs(customize)

const rejectCookies = () => {
    saveConfigs.value = false
    cookiesModal.value = false
    localStorage.setItem('kicookies', false)
}

const acceptCookies = () => {
    addSingleDoc()
    saveConfigs.value = true
    cookiesModal.value = false
    acceptedCookies.value = true
}

watch(cookiesModal, newVal => {
    if (newVal) {
        pauseTyping.value = true
    } else {
        pauseTyping.value = false
    }
})
</script>