import { storeToRefs } from 'pinia';
import {ref} from 'vue'
import { authStore } from "../store/authStore";
import { updateSingleDoc } from './firestoreDocs';

export const updateDB = async ({ name, value}) => {
    const authstore = authStore()
    const {login, user} = storeToRefs(authstore)

    if (login.value) {
        await updateSingleDoc(name, value, user.value.uid)
    }
}