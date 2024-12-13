<template>
    <div class="overflow-y-auto outline-none"  :class="[showCookiesModal ? 'fixed top-0 right-0 bottom-0 left-0 h-[100dvh] z-[999] opacity-40 bg-neutral-900' : '',]"></div>
    <div v-if="showCookiesModal" class="fixed p-3 m-auto rounded-sm w-fit max-w-[400px] bg-black text-slate-300 space-y-3 text-sm left-[50%] translate-x-[-50%] z-[9999] top-[40%] translate-y-[-50%] rounded-br-[20px]">
        <p class="text-sm text-center">This website saves your preferred settings to enhance your user experience.</p>
        <div class="flex justify-center hover:text-white">
            <div @click="acceptCookies" class="px-4 ring-[1px] hover:ring-green-700 hover:bg-green-700 py-1 whitespace-nowrap">ACCEPT</div>
            <div @click="rejectCookies" class="px-4 ring-[1px] hover:bg-red-500 py-1 whitespace-nowrap hover:ring-red-500">REJECT</div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref, onMounted, } from 'vue'
import {DB} from  '../composables/db'
import { customizeStore } from '../store/customizeStore';
import {cookiesStore} from '../store/cookiesStore'
import { storeToRefs } from 'pinia';
import { collection, doc, setDoc, getDoc, } from 'firebase/firestore'
import {app, db} from '../firebase'
import {kiboardObj} from '../composables/kiboardObject'

const cookies = cookiesStore()
const {useCookies, showCookiesModal} = storeToRefs(cookies)

const customize = customizeStore()
const {cookies_, pauseTyping} = storeToRefs(customize)

const addSingleDoc = async () => {    
    let docRef = doc(collection(db, 'user'))
    localStorage.setItem('kiboardID', docRef.id)
    await setDoc(docRef, kiboardObj().value)
    let user = doc(db, "user", docRef.id )
    await getDoc(user).then((data) => data.exists() ? localStorage.setItem('kiboardID', docRef.id) : '')
}

const rejectCookies = () => {
    cookies_.value = false
    showCookiesModal.value = false
    localStorage.setItem('kiboard', false)
}

const acceptCookies = () => {
    addSingleDoc()
    cookies_.value = true
    useCookies.value = true    
    showCookiesModal.value = false
    DB()
}

onMounted(() => showCookiesModal.value ? pauseTyping.value = true : pauseTyping.value = false )
watch(showCookiesModal, newVal => pauseTyping.value = false )
</script>