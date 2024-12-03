import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore'
import {ref} from 'vue'
import {db} from '../firebase'

export const updateDB = async (variableName, updateVal, restart, next) => {
    const main = mainStore()
    const {switchNext} = main

    const customize = customizeStore()
    const {customizers} = storeToRefs(customize)

    const updateSingleDoc = async (ID, data) => {
        const singleDoc = doc(db, "user", ID);
        await updateDoc(singleDoc, data).catch(error => console.log(error))
    } 

    let id = localStorage.getItem('kiboardID')
    const updateObject = ref({})
    updateObject.value[variableName] = updateVal
    updateSingleDoc(id, updateObject.value)

    if (next)  restart ? switchNext(customizers.value, 'restart') : switchNext(customizers.value)
}