import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export async function isCommunityExist(name) {
    const ref = doc(firestore, `communities/${name}`)
    const docSnap = await getDoc(ref);
    const isValid = docSnap.exists()

    return isValid
}

export async function searchCommunity(name) {
    //TODO
}

export async function getCommunityUsers(name) {
    const q = query(collection(firestore, `communities/${name}/users`));
    const querySnapshot = await getDocs(q);

    return querySnapshot
}

export async function getCommunityPosts(name) {
    const q = query(collection(firestore, `communities/${name}/posts`));
    const querySnapshot = await getDocs(q);

    return querySnapshot
}

export async function addCommunityPosts(commmunityName, postTitle, postType, postURL, postContent, postUser) {
    //TODO
}

export async function getYoutubeByURL(url) {
    //TODO
}

export async function getSpotifyByURL(url) {
    //TODO
}

export async function deleteCommunityPosts(communityName, postId) {
    //TODO
}

export async function addCommunityUser(communityName, user) {
    //TODO
}

export async function deleteCommunityUser(communityName, user) {
    //TODO
}

