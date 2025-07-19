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

export const updateSingleDoc = async (name, val, ID) => {
    const updateObject = {}
    updateObject[name] = val
    const singleDoc = doc(db, "users", ID);
    await updateDoc(singleDoc, updateObject)
}