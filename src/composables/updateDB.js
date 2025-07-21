import { storeToRefs } from 'pinia';
import {ref} from 'vue'
import { authStore } from "../store/authStore";
import { updateSingleDoc } from './firestoreDocs';

export const updateDB = async (updates) => {
    const authstore = authStore()
    const {login, user} = storeToRefs(authstore)

    if (!login.value || !navigator.onLine) return
    await updateSingleDoc(updates, user.value.uid)
}