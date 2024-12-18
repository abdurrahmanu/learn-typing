<template>
    <div v-if="hasInternetConnection" :class="[appTheme]" class="pl-6 py-2 rounded-sm w-fit space-y-3 text-[15px] my-2 px-5 font-[400]">
        <p>This site {{ !saveConfigs ? 'can save' : 'saves' }} your preferred settings to enhance your user experience.</p>
        <div class="hover:text-white w-fit">
            <div v-if="!saveConfigs" @click="acceptCookies" class="px-4 ring-[1px] hover:ring-green-700 hover:bg-green-700 py-1 whitespace-nowrap">ALLOW</div>
            <div v-else @click="deleteCookies" class="px-4 ring-[1px] hover:bg-red-500 py-1 whitespace-nowrap hover:ring-red-500">DISABLE</div>
        </div>
    </div>
</template>

<script setup>
import {themeStore} from '../../store/themeStore'
import { customizeStore } from '../../store/customizeStore';
import { storeToRefs } from 'pinia';
import { connectStore } from '../../store/connectStore';
import {cookiesStore} from '../../store/cookiesStore'
import {addSingleDoc, deleteSingleDoc} from '../../composables/firestoreDocs'

const connect = connectStore()
const {hasInternetConnection} = storeToRefs(connect)

const theme = themeStore()
const {appTheme} = storeToRefs(theme)

const cookies = cookiesStore()
const {saveConfigs} = storeToRefs(cookies)

const deleteCookies = () => {
    let id = localStorage.getItem('kiboardID')
    deleteSingleDoc(id)
    saveConfigs.value = false
    localStorage.removeItem('kiboardID')
    localStorage.setItem('kicookies', false)
}

const acceptCookies = () => {
    addSingleDoc()    
    if (localStorage.getItem('kicookies')) localStorage.removeItem('kicookies')
    saveConfigs.value = true
}
</script>