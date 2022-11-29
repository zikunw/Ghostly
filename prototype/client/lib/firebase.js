import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDago-4YYJGzJJVzVFceXpr4wAoeP0M4Tw",
  authDomain: "dumpster-fire-77886.firebaseapp.com",
  projectId: "dumpster-fire-77886",
  storageBucket: "dumpster-fire-77886.appspot.com",
  messagingSenderId: "252776852063",
  appId: "1:252776852063:web:d26063515a4d642da149ea",
  measurementId: "G-TMPZ5ZRNRW"
};

if (!getApps().length) {
    //...
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const firestore = getFirestore()
export const storage = getStorage()