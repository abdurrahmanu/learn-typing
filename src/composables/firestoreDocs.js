import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import {db} from '../firebase'

export const getSingleDoc = async (ID) => {
  try {
    const docRef = doc(db, "users", ID);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : {};
  } catch (error) {
    return null;
  }
}

export const addSingleDoc = async (ID) => {
  const docRef = doc(db, 'users', ID);
  await setDoc(docRef, createUser(docRef))
  const data = (await getDoc(docRef)).data()
  return data
}

export const deleteSingleDoc = async (ID) => await deleteDoc(doc(db, 'users', ID))

export const updateSingleDoc = async (updates, ID) => {
  const docRef = doc(db, "users", ID)
  const snap = await getDoc(docRef)
  let data = snap.exists() ? snap.data() : {}

  for (const update of updates) {
    const {type, name, value} = update

    if (data[type]?.[name]) data[type][name] = value
    else data[type] = value

    await setDoc(docRef, {data} , { merge: true })
  }
}
