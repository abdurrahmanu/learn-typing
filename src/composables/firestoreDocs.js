import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import {db} from '../firebase'

export const getSingleDoc = async (ID) => {
  try {
    const docRef = doc(db, "users", ID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    return null;
  }
}

export const addSingleDoc = async (ID) => {
  const docRef = doc(db, 'users', ID);
  await setDoc(docRef, userData());
  return (await getDoc(docRef)).data()
};

export const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'users', ID))

export const updateSingleDoc = async (updates, ID) => {
    const updateObj = {}

     for (const { name, value } of updates) {
      updateObj[name] = value;
    }
    
    const docRef = doc(db, "users", ID)
    await updateDoc(docRef, updateObj)
}

