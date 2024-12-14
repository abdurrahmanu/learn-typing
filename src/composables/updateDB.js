import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { cookiesStore } from "../store/cookiesStore";
import { storeToRefs } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore'
import {ref} from 'vue'
import {db} from '../firebase'

export const updateDB = async (variableName, updateVal, restart, next) => {
    const main = mainStore()
    const {switchNext} = main

    const cookies = cookiesStore()
    const {showCookiesModal} = storeToRefs(cookies)

    const customize = customizeStore()
    const {customizers} = storeToRefs(customize)

    if (next)  restart ? switchNext(customizers.value, 'restart') : switchNext(customizers.value)
        
    if (navigator.onLine && localStorage.getItem('kiboardID')) {
        let id = localStorage.getItem('kiboardID')
        const updateObject = ref({})
        updateObject.value[variableName] = updateVal
        const singleDoc = doc(db, "user", id);
        await updateDoc(singleDoc, updateObject.value)
    } 

    else if (!localStorage.getItem('kicookies') && navigator.onLine) showCookiesModal.value = true
}