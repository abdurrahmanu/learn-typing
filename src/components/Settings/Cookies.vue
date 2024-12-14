<template>
    <div v-if="hasInternetConnection" class="p-3 m-auto rounded-sm w-fit max-w-[400px] bg-black text-slate-300 space-y-3 text-sm  my-2">
        <p class="text-center">This website {{ !cookies_ ? 'can save' : 'saves' }} your preferred settings to enhance your user experience.</p>
        <div class="flex justify-center hover:text-white">
            <div v-if="!cookies_" @click="acceptCookies" class="px-4 ring-[1px] hover:ring-green-700 hover:bg-green-700 py-1 whitespace-nowrap">USE COOKIES</div>
            <div v-else @click="deleteCookies" class="px-4 ring-[1px] hover:bg-red-500 py-1 whitespace-nowrap hover:ring-red-500">DELETE COOKIES</div>
        </div>
    </div>
</template>

<script setup>
import { collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase';
import { kiboardObj } from '../../composables/kiboardObject';
import { customizeStore } from '../../store/customizeStore';
import { storeToRefs } from 'pinia';
import { connectStore } from '../../store/connectStore';

const connect = connectStore()
const {hasInternetConnection} = storeToRefs(connect)

const customize = customizeStore()
const {cookies_} = storeToRefs(customize)

const   addSingleDoc = async () => {
    let docRef = doc(collection(db, 'user'))
    await setDoc(docRef, kiboardObj().value)
    let user = doc(db, "user", docRef.id )
    await getDoc(user).then((data) => data.exists() ? localStorage.setItem('kiboardID', docRef.id) : '')
}

const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'user', ID))

const deleteCookies = () => {
    let id = localStorage.getItem('kiboardID')
    deleteSingleDoc(id)
    cookies_.value = false
    localStorage.removeItem('kiboardID')
    localStorage.setItem('kicookies', false)
}

const acceptCookies = () => {
    addSingleDoc()    
    if (localStorage.getItem('kicookies')) localStorage.removeItem('kicookies')
    cookies_.value = true
}
</script>