import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from './firebase.js'

const COLLECTION = 'guides'

export async function loadGuides() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function saveGuide(guide) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...guide,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}