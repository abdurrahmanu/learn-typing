import { storeToRefs } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore'
import {ref} from 'vue'
import {db} from '../firebase'
import { authStore } from "../store/authStore";

export const updateDB = async ({ name, value}) => {
    const authstore = authStore()
    const {login, user} = storeToRefs(authstore)
    
    if (login.value) {
        const updateObject = ref({})
        updateObject.value[name] = value
        const singleDoc = doc(db, "user", user.value.uid);
        await updateDoc(singleDoc, updateObject.value)
    }
}