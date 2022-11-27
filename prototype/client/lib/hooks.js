import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firestore, auth } from '../lib/firebase'
import { doc, onSnapshot } from "firebase/firestore";

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)

    useEffect(() => {
      let unsubsribe;

      if (user) {
        const docRef = doc(firestore, "users", user.uid)
        unsubsribe = onSnapshot(docRef, (doc) => {
          setUsername(doc.data()?.username)
        })
      } else {
        setUsername(null)
      }

      return unsubsribe

    }, [user])

    return {user, username}
}