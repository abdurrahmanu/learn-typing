import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import {kiboardObject} from './kiboardObject'
import {db} from '../firebase'

export const getSingleDoc = async (ID) => {
    let user = doc(db, "users", ID )
    return await getDoc(user).then((data) => data.exists() ? data.data() : null )
}

export const addSingleDoc = async (ID) => {
  const userDocRef = doc(db, 'users', ID);
  await setDoc(userDocRef, kiboardObject());
};

export const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'users', ID))

export const updateSingleDoc = async (variableName, updateVal) => {
    let id = user.value.uid
    const updateObject = ref({})
    updateObject.value[variableName] = updateVal
    const singleDoc = doc(db, "users", id);
    await updateDoc(singleDoc, updateObject.value)
}