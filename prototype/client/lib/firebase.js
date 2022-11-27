import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfC7Oggf_ITVnHn7nKr6LDISNP-jLcjkI",
    authDomain: "fireship-tutorial-ffdae.firebaseapp.com",
    projectId: "fireship-tutorial-ffdae",
    storageBucket: "fireship-tutorial-ffdae.appspot.com",
    messagingSenderId: "239639740612",
    appId: "1:239639740612:web:a9755e85fe945af4260991",
    measurementId: "G-BHH78VKM47"
  };

if (!getApps().length) {
    //...
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const firestore = getFirestore()
export const storage = getStorage()