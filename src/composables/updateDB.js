import { nextStore } from "../store/nextStore";
import { cookiesStore } from "../store/cookiesStore";
import { storeToRefs } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore'
import {ref} from 'vue'
import {db} from '../firebase'

export const updateDB = async ({
    name: name,
    value : value
}) => {
    
    const cookies = cookiesStore()
    const {cookiesModal, acceptedCookies} = storeToRefs(cookies)
    
    if (localStorage.getItem('kiboardID')) {
        let id = localStorage.getItem('kiboardID')
        const updateObject = ref({})
        updateObject.value[name] = value
        const singleDoc = doc(db, "user", id);
        await updateDoc(singleDoc, updateObject.value)
    }

    else if (!localStorage.getItem('kicookies') && navigator.onLine) {
        if (!acceptedCookies.value) cookiesModal.value = true
    }
}