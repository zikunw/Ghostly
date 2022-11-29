import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export async function isCommunityExist(name) {

    const ref = doc(firestore, `communities/${name}`)
    const docSnap = await getDoc(ref);
    const isValid = docSnap.exists()

    return isValid
}

export async function getCommunityUsers(name) {

    const q = query(collection(firestore, `communities/${name}/users`));
    const querySnapshot = await getDocs(q);

    return querySnapshot

}