import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import {kiboardObj} from './kiboardObject'
import {db} from '../firebase'

export const getSingleDoc = async (ID) => {
    let user = doc(db, "user", ID )
    return await getDoc(user).then((data) => data.exists() ? data.data() : false )
}

export const   addSingleDoc = async () => {
    let docRef = doc(collection(db, 'user'))
    await setDoc(docRef, kiboardObj().value)
    let user = doc(db, "user", docRef.id )
    await getDoc(user).then((data) => data.exists() ? localStorage.setItem('kiboardID', docRef.id) : '')

}

export const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'user', ID))

export const updateSingleDoc = async (variableName, updateVal) => {
    let id = localStorage.getItem('kiboardID')
    const updateObject = ref({})
    updateObject.value[variableName] = updateVal
    const singleDoc = doc(db, "user", id);
    await updateDoc(singleDoc, updateObject.value)
}