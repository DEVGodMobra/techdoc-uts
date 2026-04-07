import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyB4melz4U3G3rGZZdDq9zM_Tqtp8Drns8o",
  authDomain:        "techdoc-uts.firebaseapp.com",
  projectId:         "techdoc-uts",
  storageBucket:     "techdoc-uts.firebasestorage.app",
  messagingSenderId: "67920210033",
  appId:             "1:67920210033:web:6fde6341c6969fc25953d0",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)