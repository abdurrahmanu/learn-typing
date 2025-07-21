import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import {userData} from './userData'
import {db} from '../firebase'

export const getSingleDoc = async (ID) => {
  try {
    const userRef = doc(db, "users", ID);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Failed to fetch document with ID ${ID}:`, error);
    return null;
  }
}

export const addSingleDoc = async (ID) => {
  const userDocRef = doc(db, 'users', ID);
  await setDoc(userDocRef, userData());
  return (await getDoc(userDocRef)).data()
};

export const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'users', ID))

export const updateSingleDoc = async (name, val, ID) => {
    const updateObject = {}
    updateObject[name] = val
    const singleDoc = doc(db, "users", ID)
    await updateDoc(singleDoc, updateObject)

    // After updating online update offline
}