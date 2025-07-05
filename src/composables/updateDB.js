import { mainStore } from "../store/mainStore"
import { nextStore } from "../store/nextStore";
import { customizeStore } from "../store/customizeStore";
import { cookiesStore } from "../store/cookiesStore";
import { storeToRefs } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore'
import {ref} from 'vue'
import {db} from '../firebase'

export const updateDB = async (variableName, updateVal, restart, next) => {
    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const cookies = cookiesStore()
    const {cookiesModal, acceptedCookies} = storeToRefs(cookies)

    if (next) goNext.value = true
    
    if (localStorage.getItem('kiboardID')) {
        let id = localStorage.getItem('kiboardID')
        const updateObject = ref({})
        updateObject.value[variableName] = updateVal
        const singleDoc = doc(db, "user", id);
        await updateDoc(singleDoc, updateObject.value)
    }

    else if (!localStorage.getItem('kicookies') && navigator.onLine) {
        if (!acceptedCookies.value) cookiesModal.value = true
    }
}